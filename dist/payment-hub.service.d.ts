import { YookassaInvoiceService } from './modules/yookassa/invoice/invoice.service';
import { YookassaPaymentMethodService } from './modules/yookassa/payment-method/payment-method.service';
import { YookassaPaymentService } from './modules/yookassa/payment/payment.service';
import { YookassaRefundService } from './modules/yookassa/refund/refund.service';
export declare class PaymentHubService {
    payments: YookassaPaymentService;
    paymentMethods: YookassaPaymentMethodService;
    invoices: YookassaInvoiceService;
    refunds: YookassaRefundService;
    constructor(payments: YookassaPaymentService, paymentMethods: YookassaPaymentMethodService, invoices: YookassaInvoiceService, refunds: YookassaRefundService);
}
