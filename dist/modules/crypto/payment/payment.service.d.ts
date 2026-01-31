import { CryptoHttpClient } from '../core/http/crypto.http-client';
import type { CreateCryptoInvoiceRequest, CryptoInvoice } from './interfaces';
export declare class CryptoPaymentService {
    private readonly http;
    constructor(http: CryptoHttpClient);
    createInvoice(data: CreateCryptoInvoiceRequest): Promise<CryptoInvoice>;
    getInvoices(params?: Record<string, any>): Promise<unknown>;
    pickConfirmationUrl(invoice: CryptoInvoice): string | null;
}
