import { Injectable } from '@nestjs/common'
import { TbankHttpClient } from '../core/http/tbank.http-client'

@Injectable()
export class TbankMirPayService {
	public constructor(private readonly http: TbankHttpClient) {}

	public getDeepLink(PaymentId: string) {
		return this.http.post('MirPay/GetDeepLink', { PaymentId })
	}
}
