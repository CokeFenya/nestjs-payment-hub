import { applyDecorators, UseGuards } from '@nestjs/common'
import { CryptoWebhookGuard } from '../guards/crypto-webhook.guard'

export function CryptoWebhook() {
	return applyDecorators(UseGuards(CryptoWebhookGuard))
}
