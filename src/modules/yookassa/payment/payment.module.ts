import { Module } from '@nestjs/common'
import { YookassaPaymentService } from './payment.service'

@Module({
	providers: [YookassaPaymentService],
	exports: [YookassaPaymentService]
})
export class YookassaPaymentModule {}
