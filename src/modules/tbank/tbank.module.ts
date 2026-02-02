import { Module } from '@nestjs/common'

import { TbankCardModule } from './card/card.module'
import { TbankCoreModule } from './core/tbank-core.module'
import { TbankFiscalizationModule } from './fiscalization/fiscalization.module'
import { TbankSberPayModule } from './sberpay/sberpay.module'
import { TbankSbpModule } from './sbp/sbp.module'
import { TbankTpayModule } from './tpay/tpay.module'

import { TbankProviderService } from './tbank-provider.service'
import { TbankWebhookGuard } from './webhook/guards/tbank-webhook.guard'

@Module({
	imports: [
		TbankCoreModule,
		TbankCardModule,
		TbankSbpModule,
		TbankTpayModule,
		TbankSberPayModule,
		TbankFiscalizationModule
	],
	providers: [TbankProviderService, TbankWebhookGuard],
	exports: [TbankProviderService, TbankCoreModule, TbankWebhookGuard]
})
export class TbankModule {}
