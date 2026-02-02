import { Injectable } from '@nestjs/common'
import { TbankHttpClient } from '../core/http/tbank.http-client'
import type { SberPayLinkResponse } from './interfaces'

@Injectable()
export class TbankSberPayService {
	public constructor(private readonly http: TbankHttpClient) {}

	public link(paymentId: number): Promise<SberPayLinkResponse> {
		return this.http.getBearer<SberPayLinkResponse>(
			`v2/SberPay/transactions/${encodeURIComponent(String(paymentId))}/link`
		)
	}

	public qr(paymentId: number): Promise<string> {
		return this.http.getBearerText(
			`v2/SberPay/${encodeURIComponent(String(paymentId))}/QR`,
			{ Accept: 'image/svg+xml' }
		)
	}
}
