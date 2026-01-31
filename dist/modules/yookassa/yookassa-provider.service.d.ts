import { YookassaInvoiceService } from './invoice/invoice.service';
import { YookassaPaymentMethodService } from './payment-method/payment-method.service';
import { YookassaPaymentService } from './payment/payment.service';
import { YookassaRefundService } from './refund/refund.service';
export declare class YookassaProviderService {
    readonly payments: YookassaPaymentService;
    readonly paymentMethods: YookassaPaymentMethodService;
    readonly invoices: YookassaInvoiceService;
    readonly refunds: YookassaRefundService;
    constructor(payments: YookassaPaymentService, paymentMethods: YookassaPaymentMethodService, invoices: YookassaInvoiceService, refunds: YookassaRefundService);
}
