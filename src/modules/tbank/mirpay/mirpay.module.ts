import { Module } from '@nestjs/common'
import { TbankCoreModule } from '../core/tbank-core.module'
import { TbankMirPayService } from './mirpay.service'

@Module({
	imports: [TbankCoreModule],
	providers: [TbankMirPayService],
	exports: [TbankMirPayService]
})
export class TbankMirPayModule {}
