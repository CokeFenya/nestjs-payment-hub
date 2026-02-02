import { Module } from '@nestjs/common'
import { TbankCoreModule } from '../core/tbank-core.module'
import { TbankPaymentService } from './payment.service'

@Module({
	imports: [TbankCoreModule],
	providers: [TbankPaymentService],
	exports: [TbankPaymentService]
})
export class TbankPaymentModule {}
