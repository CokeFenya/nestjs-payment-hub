import { CryptoPayHttpClient } from '../core/http/crypto-pay.http-client';
import type { CreateCryptoInvoiceRequest, CreateCryptoInvoiceResponse } from './interfaces';
export declare class CryptoPaymentService {
    private readonly http;
    constructor(http: CryptoPayHttpClient);
    createInvoice(data: CreateCryptoInvoiceRequest): Promise<CreateCryptoInvoiceResponse>;
}
