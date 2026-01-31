import { Module } from '@nestjs/common'
import { YookassaRefundService } from './refund.service'

@Module({
	providers: [YookassaRefundService],
	exports: [YookassaRefundService]
})
export class YookassaRefundModule {}
