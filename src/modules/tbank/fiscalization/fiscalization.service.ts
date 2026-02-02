import { Injectable } from '@nestjs/common'
import { TbankHttpClient } from '../core/http/tbank.http-client'

@Injectable()
export class TbankFiscalizationService {
	public constructor(private readonly http: TbankHttpClient) {}

	// /cashbox/SendClosingReceipt (Bearer)
	public sendClosingReceipt(data: any): Promise<any> {
		return this.http.postBearer('cashbox/SendClosingReceipt', data)
	}
}
