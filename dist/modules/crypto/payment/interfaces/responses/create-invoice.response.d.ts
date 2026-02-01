import type { CryptoPayInvoice } from '../invoice.interface';
export interface CreateCryptoInvoiceResponse {
    ok: boolean;
    result: CryptoPayInvoice;
}
