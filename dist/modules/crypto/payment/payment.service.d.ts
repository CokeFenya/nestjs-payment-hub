import { CryptoHttpClient } from '../core/http/crypto.http-client';
import type { CreateCryptoInvoiceRequest, CryptoInvoice } from './interfaces';
type GetInvoicesResult = {
    items: CryptoInvoice[];
};
export declare class CryptoPaymentService {
    private readonly http;
    constructor(http: CryptoHttpClient);
    createInvoice(data: CreateCryptoInvoiceRequest): Promise<CryptoInvoice>;
    getInvoices(params?: Record<string, any>): Promise<GetInvoicesResult>;
    pickConfirmationUrl(invoice: CryptoInvoice): string | null;
    verifyInvoicePaid(invoiceId: number): Promise<CryptoInvoice | null>;
}
export {};
