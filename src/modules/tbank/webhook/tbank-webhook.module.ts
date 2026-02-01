import { Module } from '@nestjs/common'
import { TbankCoreModule } from '../core/tbank-core.module'
import { TbankWebhookGuard } from './guards/tbank-webhook.guard'

@Module({
	imports: [TbankCoreModule],
	providers: [TbankWebhookGuard],
	exports: [TbankCoreModule, TbankWebhookGuard]
})
export class TbankWebhookModule {}
