import { Module } from '@nestjs/common'
import { TbankCoreModule } from '../core/tbank-core.module'
import { TbankTpayService } from './tpay.service'

@Module({
	imports: [TbankCoreModule],
	providers: [TbankTpayService],
	exports: [TbankTpayService]
})
export class TbankTpayModule {}
