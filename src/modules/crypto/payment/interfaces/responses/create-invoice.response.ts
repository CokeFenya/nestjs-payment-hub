import type { CryptoInvoice } from '../crypto-invoice.interface'

export type CryptoApiOk<T> = { ok: true; result: T }
export type CryptoApiFail = { ok: false; error: string }
export type CryptoApiResponse<T> = CryptoApiOk<T> | CryptoApiFail

export type CreateCryptoInvoiceResponse = CryptoApiResponse<CryptoInvoice>
