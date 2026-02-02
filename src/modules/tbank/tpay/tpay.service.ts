import { Inject, Injectable } from '@nestjs/common'
import { request } from 'undici'
import {
	TbankModuleOptions,
	TbankOptionsSymbol
} from '../../../common/interfaces'
import {
	TBANK_API_BASE_URL_PROD,
	TBANK_API_BASE_URL_TEST
} from '../core/config/tbank.constants'

@Injectable()
export class TbankTpayService {
	public constructor(
		@Inject(TbankOptionsSymbol) private readonly cfg: TbankModuleOptions
	) {}

	private baseUrl() {
		return (
			this.cfg.isTest ? TBANK_API_BASE_URL_TEST : TBANK_API_BASE_URL_PROD
		).replace(/\/+$/, '')
	}

	public async getLink(paymentId: number, version: string = '2.0') {
		const url = `${this.baseUrl()}/v2/TinkoffPay/transactions/${paymentId}/versions/${version}/link`
		const res = await request(url, { method: 'GET' })
		return res.body.json()
	}

	public async getQrSvg(paymentId: number) {
		const url = `${this.baseUrl()}/v2/TinkoffPay/${paymentId}/QR`
		const res = await request(url, { method: 'GET' })
		// дока: 200 = SVG :contentReference[oaicite:24]{index=24}
		return res.body.text()
	}
}
