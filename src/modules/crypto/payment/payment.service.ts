import { Injectable } from '@nestjs/common'
import { CryptoPayHttpClient } from '../core/http/crypto-pay.http-client'
import type {
	CreateCryptoInvoiceRequest,
	CreateCryptoInvoiceResponse
} from './interfaces'

@Injectable()
export class CryptoPaymentService {
	public constructor(private readonly http: CryptoPayHttpClient) {}

	public async createInvoice(data: CreateCryptoInvoiceRequest) {
		return this.http.post<CreateCryptoInvoiceResponse>(
			'createInvoice',
			data
		)
	}

	/**
	 * Если захочешь проверять оплату polling’ом (не webhook),
	 * можно потом добавить getInvoices/getInvoice.
	 */
}
