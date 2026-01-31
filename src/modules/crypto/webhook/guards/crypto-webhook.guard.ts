import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Inject,
	Injectable
} from '@nestjs/common'
import { createHash, createHmac } from 'crypto'
import type { Request } from 'express'
import {
	CryptoOptionsSymbol,
	type CryptoModuleOptions
} from '../../../../common/interfaces/crypto/crypto-options.interface'

@Injectable()
export class CryptoWebhookGuard implements CanActivate {
	public constructor(
		@Inject(CryptoOptionsSymbol)
		private readonly cfg: CryptoModuleOptions
	) {}

	public canActivate(ctx: ExecutionContext): boolean {
		const req = ctx
			.switchToHttp()
			.getRequest<Request & { rawBody?: string }>()

		const signature = (
			req.headers['crypto-pay-api-signature'] as string | undefined
		)?.trim()
		if (!signature) throw new ForbiddenException('Missing crypto signature')

		const raw = req.rawBody ?? ''
		if (!raw) throw new ForbiddenException('Missing rawBody')

		const secret = createHash('sha256').update(this.cfg.apiToken).digest()
		const hmac = createHmac('sha256', secret).update(raw).digest('hex')

		if (hmac !== signature)
			throw new ForbiddenException('Invalid crypto signature')

		return true
	}
}
