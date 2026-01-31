import { Module } from '@nestjs/common'
import { YookassaPaymentMethodService } from './payment-method.service'

@Module({
	providers: [YookassaPaymentMethodService],
	exports: [YookassaPaymentMethodService]
})
export class YookassaPaymentMethodModule {}
