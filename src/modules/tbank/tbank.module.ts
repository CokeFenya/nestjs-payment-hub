// src/modules/tbank/tbank.module.ts
import { Module } from '@nestjs/common'
import { TbankCoreModule } from './core/tbank-core.module'
import { TbankPaymentModule } from './payment/payment.module'
import { TbankProviderService } from './tbank-provider.service'
import { TbankWebhookModule } from './webhook/tbank-webhook.module'

@Module({
	imports: [TbankCoreModule, TbankPaymentModule, TbankWebhookModule],
	providers: [TbankProviderService],
	exports: [TbankProviderService, TbankWebhookModule]
})
export class TbankModule {}
