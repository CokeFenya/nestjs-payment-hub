import { Module } from '@nestjs/common'
import { TbankCoreModule } from '../core/tbank-core.module'
import { TbankSbpService } from './sbp.service'

@Module({
	imports: [TbankCoreModule],
	providers: [TbankSbpService],
	exports: [TbankSbpService]
})
export class TbankSbpModule {}
