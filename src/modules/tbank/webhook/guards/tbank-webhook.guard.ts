import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Inject,
	Injectable,
	Logger
} from '@nestjs/common'
import type { Request } from 'express'

import {
	TbankModuleOptions,
	TbankOptionsSymbol
} from '../../../../common/interfaces'
import { isIpAllowed } from '../../../../common/utils/ip-matcher.util'
import { buildTbankToken } from '../../core/utils/tbank-token.util'
import { TBANK_IP_WHITELIST } from '../constants/tbank-ip-whitelist'

@Injectable()
export class TbankWebhookGuard implements CanActivate {
	private readonly logger = new Logger(TbankWebhookGuard.name)

	public constructor(
		@Inject(TbankOptionsSymbol)
		private readonly cfg: TbankModuleOptions
	) {}

	public canActivate(context: ExecutionContext): boolean {
		const req = context.switchToHttp().getRequest<Request>()
		const body: any = req.body ?? {}

		// 1) IP whitelist
		const clientIp = this.extractClientIp(req)
		if (!isIpAllowed(clientIp, TBANK_IP_WHITELIST as unknown as string[])) {
			this.logger.warn(
				`Blocked webhook request from unauthorized IP: ${clientIp}`
			)
			throw new ForbiddenException('Webhook request is not from T-Bank')
		}

		// 2) Token verification
		const token = body?.Token
		if (!token || typeof token !== 'string') {
			this.logger.warn('Webhook without Token')
			throw new ForbiddenException(
				'Invalid T-Bank webhook: missing Token'
			)
		}

		// По доке: Token считается по корневым полям, исключая Token и вложенные Data/Receipt. :contentReference[oaicite:3]{index=3}
		const expected = buildTbankToken(
			body,
			this.cfg.password,
			new Set(['Token', 'Data', 'Receipt'])
		)

		if (expected !== token) {
			this.logger.warn('Webhook Token mismatch')
			throw new ForbiddenException(
				'Invalid T-Bank webhook: Token mismatch'
			)
		}

		return true
	}

	private extractClientIp(req: Request): string {
		const xff = req.headers['x-forwarded-for']
		if (typeof xff === 'string') return xff.split(',')[0].trim()
		return req.socket.remoteAddress ?? ''
	}
}
