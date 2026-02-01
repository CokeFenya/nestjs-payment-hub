// src/modules/yookassa/payment/payment.module.ts
import { Module } from '@nestjs/common'
import { YookassaCoreModule } from '../core/yookassa-core.module'
import { YookassaPaymentService } from './payment.service'

@Module({
	imports: [YookassaCoreModule],
	providers: [YookassaPaymentService],
	exports: [YookassaPaymentService]
})
export class YookassaPaymentModule {}
