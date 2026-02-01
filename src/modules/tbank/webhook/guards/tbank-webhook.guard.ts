// src/modules/tbank/webhook/guards/tbank-webhook.guard.ts
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Inject,
	Injectable
} from '@nestjs/common'
import type { Request } from 'express'
import type { TbankModuleOptions } from '../../../../common/interfaces'
import { TbankOptionsSymbol } from '../../core/config/tbank.constants'
import { createTbankToken } from '../../core/http/tbank.http-client'

@Injectable()
export class TbankWebhookGuard implements CanActivate {
	public constructor(
		@Inject(TbankOptionsSymbol) private readonly opts: TbankModuleOptions
	) {}

	public canActivate(ctx: ExecutionContext): boolean {
		const req = ctx.switchToHttp().getRequest<Request>()
		const body = (req.body ?? {}) as Record<string, unknown>

		const received = String(body.Token ?? '')
		if (!received) throw new ForbiddenException('Missing webhook token')

		// Сравниваем подпись
		const expected = createTbankToken(body, this.opts.password, [
			'Token',
			'Password'
		])
		if (received !== expected)
			throw new ForbiddenException('Invalid webhook token')

		// Доп. проверка терминала
		if (String(body.TerminalKey ?? '') !== this.opts.terminalKey) {
			throw new ForbiddenException('Invalid terminal key')
		}

		if (!body.OrderId || !body.PaymentId || !body.Status) {
			throw new ForbiddenException('Invalid webhook payload')
		}

		return true
	}
}
