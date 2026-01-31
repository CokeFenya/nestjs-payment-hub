import { Module } from '@nestjs/common'

import { YookassaInvoiceModule } from './invoice/invoice.module'
import { YookassaPaymentMethodModule } from './payment-method/payment-method.module'
import { YookassaPaymentModule } from './payment/payment.module'
import { YookassaRefundModule } from './refund/refund.module'
import { YookassaProviderService } from './yookassa-provider.service'

@Module({
	imports: [
		YookassaPaymentModule,
		YookassaRefundModule,
		YookassaInvoiceModule,
		YookassaPaymentMethodModule
	],
	providers: [YookassaProviderService],
	exports: [YookassaProviderService]
})
export class YookassaModule {}
