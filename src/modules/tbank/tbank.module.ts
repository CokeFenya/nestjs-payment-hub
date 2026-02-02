import { Module } from '@nestjs/common'

import { TbankCoreModule } from './core/tbank-core.module'
import { TbankMirPayModule } from './mirpay/mirpay.module'
import { TbankPaymentModule } from './payment/payment.module'
import { TbankSbpModule } from './sbp/sbp.module'
import { TbankTpayModule } from './tpay/tpay.module'

import { TbankProviderService } from './tbank-provider.service'
import { TbankWebhookGuard } from './webhook/guards/tbank-webhook.guard'

@Module({
	imports: [
		TbankCoreModule,
		TbankPaymentModule,
		TbankSbpModule,
		TbankTpayModule,
		TbankMirPayModule
	],
	providers: [TbankProviderService, TbankWebhookGuard],
	exports: [TbankProviderService]
})
export class TbankModule {}
