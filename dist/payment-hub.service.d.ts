import { InvoiceService } from './modules/yookassa/invoice/invoice.service';
import { PaymentMethodService } from './modules/yookassa/payment-method/payment-method.service';
import { PaymentService } from './modules/yookassa/payment/payment.service';
import { RefundService } from './modules/yookassa/refund/refund.service';
export declare class PaymentHubService {
    payments: PaymentService;
    paymentMethods: PaymentMethodService;
    invoices: InvoiceService;
    refunds: RefundService;
    constructor(payments: PaymentService, paymentMethods: PaymentMethodService, invoices: InvoiceService, refunds: RefundService);
}
