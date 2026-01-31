import { Injectable } from '@nestjs/common'

import { YookassaInvoiceService } from './invoice/invoice.service'
import { YookassaPaymentMethodService } from './payment-method/payment-method.service'
import { YookassaPaymentService } from './payment/payment.service'
import { YookassaRefundService } from './refund/refund.service'

@Injectable()
export class YookassaProviderService {
	public constructor(
		public readonly payments: YookassaPaymentService,
		public readonly paymentMethods: YookassaPaymentMethodService,
		public readonly invoices: YookassaInvoiceService,
		public readonly refunds: YookassaRefundService
	) {}
}
