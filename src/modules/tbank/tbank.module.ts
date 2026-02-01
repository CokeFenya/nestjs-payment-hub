import { Module } from '@nestjs/common'
import { TbankCoreModule } from './core/tbank-core.module'
import { TbankPaymentModule } from './payment/payment.module'
import { TbankProviderService } from './tbank-provider.service'

@Module({
	imports: [TbankCoreModule, TbankPaymentModule],
	providers: [TbankProviderService],
	exports: [TbankProviderService]
})
export class TbankModule {}
