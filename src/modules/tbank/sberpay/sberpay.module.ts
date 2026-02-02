import { Module } from '@nestjs/common'
import { TbankCoreModule } from '../core/tbank-core.module'
import { TbankSberPayService } from './sberpay.service'

@Module({
	imports: [TbankCoreModule],
	providers: [TbankSberPayService],
	exports: [TbankSberPayService]
})
export class TbankSberPayModule {}
