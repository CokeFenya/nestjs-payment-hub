import { Injectable } from '@nestjs/common'
import { CryptoHttpClient } from '../core/http/crypto.http-client'
import type { CreateCryptoInvoiceRequest, CryptoInvoice } from './interfaces'

type GetInvoicesResult = { items: CryptoInvoice[] }

@Injectable()
export class CryptoPaymentService {
	public constructor(private readonly http: CryptoHttpClient) {}

	public async createInvoice(
		data: CreateCryptoInvoiceRequest
	): Promise<CryptoInvoice> {
		return this.http.post<CryptoInvoice>('/createInvoice', data)
	}

	public async getInvoices(
		params?: Record<string, any>
	): Promise<GetInvoicesResult> {
		return this.http.get<GetInvoicesResult>('/getInvoices', params)
	}

	public pickConfirmationUrl(invoice: CryptoInvoice): string | null {
		return (
			invoice?.bot_invoice_url ??
			invoice?.web_app_invoice_url ??
			invoice?.mini_app_invoice_url ??
			null
		)
	}

	public async verifyInvoicePaid(
		invoiceId: number
	): Promise<CryptoInvoice | null> {
		const res = await this.getInvoices({ invoice_ids: String(invoiceId) })
		const item = res?.items?.[0]
		if (!item) return null
		if (item.invoice_id !== invoiceId) return null
		return item.status === 'paid' ? item : null
	}
}
