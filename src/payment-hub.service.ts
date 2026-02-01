import { Injectable } from '@nestjs/common'
import { YookassaInvoiceService } from './modules/yookassa/invoice/invoice.service'
import { YookassaPaymentMethodService } from './modules/yookassa/payment-method/payment-method.service'
import { YookassaPaymentService } from './modules/yookassa/payment/payment.service'
import { YookassaRefundService } from './modules/yookassa/refund/refund.service'

@Injectable()
export class PaymentHubService {
	public constructor(
		public payments: YookassaPaymentService,
		public paymentMethods: YookassaPaymentMethodService,
		public invoices: YookassaInvoiceService,
		public refunds: YookassaRefundService
	) {}
}
