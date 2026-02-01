import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Inject,
	Injectable
} from '@nestjs/common'
import type { Request } from 'express'
import type { TbankOptions } from '../../../../common/interfaces/tbank/tbank-options.interface'
import { TBANK_OPTIONS } from '../../core/config/tbank.constants'
import { createTbankToken } from '../../core/http/tbank.http-client'

@Injectable()
export class TbankWebhookGuard implements CanActivate {
	public constructor(
		@Inject(TBANK_OPTIONS) private readonly opts: TbankOptions
	) {}

	public canActivate(ctx: ExecutionContext): boolean {
		const req = ctx.switchToHttp().getRequest<Request>()
		const body = (req.body ?? {}) as Record<string, unknown>

		// 1. Token обязан быть
		const received = String(body.Token ?? '')
		if (!received) {
			throw new ForbiddenException('Missing webhook token')
		}

		// 2. Проверяем подпись (по документации T-Bank)
		const expected = createTbankToken(body, this.opts.password)
		if (received !== expected) {
			throw new ForbiddenException('Invalid webhook token')
		}

		// 3. Доп. защита: TerminalKey должен совпадать
		if (body.TerminalKey !== this.opts.terminalKey) {
			throw new ForbiddenException('Invalid terminal key')
		}

		// 4. Минимальный набор обязательных полей
		if (!body.OrderId || !body.PaymentId || !body.Status) {
			throw new ForbiddenException('Invalid webhook payload')
		}

		return true
	}
}
