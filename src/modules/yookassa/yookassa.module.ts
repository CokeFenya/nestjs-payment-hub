// src/modules/yookassa/yookassa.module.ts
import { Module } from '@nestjs/common'

import { YookassaCoreModule } from './core/yookassa-core.module'
import { YookassaInvoiceModule } from './invoice/invoice.module'
import { YookassaPaymentMethodModule } from './payment-method/payment-method.module'
import { YookassaPaymentModule } from './payment/payment.module'
import { YookassaRefundModule } from './refund/refund.module'

import { YookassaProviderService } from './yookassa-provider.service'

@Module({
	imports: [
		YookassaCoreModule, // ✅ обязательно

		YookassaPaymentModule,
		YookassaRefundModule,
		YookassaInvoiceModule,
		YookassaPaymentMethodModule
	],
	providers: [YookassaProviderService],
	exports: [YookassaProviderService]
})
export class YookassaModule {}
