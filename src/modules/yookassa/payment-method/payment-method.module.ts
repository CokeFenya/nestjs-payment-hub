// src/modules/yookassa/payment-method/payment-method.module.ts
import { Module } from '@nestjs/common'
import { YookassaCoreModule } from '../core/yookassa-core.module'
import { YookassaPaymentMethodService } from './payment-method.service'

@Module({
	imports: [YookassaCoreModule],
	providers: [YookassaPaymentMethodService],
	exports: [YookassaPaymentMethodService]
})
export class YookassaPaymentMethodModule {}
