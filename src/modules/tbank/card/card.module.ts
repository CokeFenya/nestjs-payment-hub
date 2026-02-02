import { Module } from '@nestjs/common'
import { TbankCoreModule } from '../core/tbank-core.module'
import { TbankCardService } from './card.service'

@Module({
	imports: [TbankCoreModule],
	providers: [TbankCardService],
	exports: [TbankCardService]
})
export class TbankCardModule {}
