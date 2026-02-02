import { Module } from '@nestjs/common'
import { TbankCoreModule } from '../core/tbank-core.module'
import { TbankFiscalizationService } from './fiscalization.service'

@Module({
	imports: [TbankCoreModule],
	providers: [TbankFiscalizationService],
	exports: [TbankFiscalizationService]
})
export class TbankFiscalizationModule {}
