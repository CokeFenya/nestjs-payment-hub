import { applyDecorators, UseGuards } from '@nestjs/common'
import { TbankWebhookGuard } from '../guards/tbank-webhook.guard'

export function TbankWebhook() {
	return applyDecorators(UseGuards(TbankWebhookGuard))
}
