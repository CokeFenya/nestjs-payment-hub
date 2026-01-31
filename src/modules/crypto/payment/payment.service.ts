// src/modules/crypto/payment/payment.service.ts
import { Injectable } from '@nestjs/common'
import { CryptoHttpClient } from '../core/http/crypto.http-client'
import type { CreateCryptoInvoiceRequest, CryptoInvoice } from './interfaces'

@Injectable()
export class CryptoPaymentService {
	public constructor(private readonly http: CryptoHttpClient) {}

	public async createInvoice(
		data: CreateCryptoInvoiceRequest
	): Promise<CryptoInvoice> {
		return this.http.post<CryptoInvoice>('/createInvoice', data)
	}

	public async getInvoices(params?: Record<string, any>) {
		return this.http.get('/getInvoices', params)
	}

	public pickConfirmationUrl(invoice: CryptoInvoice): string | null {
		return (
			invoice?.bot_invoice_url ??
			invoice?.web_app_invoice_url ??
			invoice?.mini_app_invoice_url ??
			null
		)
	}
}
