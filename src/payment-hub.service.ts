import { Injectable } from '@nestjs/common'
import { InvoiceService } from './modules/yookassa/invoice/invoice.service'
import { PaymentMethodService } from './modules/yookassa/payment-method/payment-method.service'
import { PaymentService } from './modules/yookassa/payment/payment.service'
import { RefundService } from './modules/yookassa/refund/refund.service'

@Injectable()
export class PaymentHubService {
	public constructor(
		public payments: PaymentService,
		public paymentMethods: PaymentMethodService,
		public invoices: InvoiceService,
		public refunds: RefundService
	) {}
}
