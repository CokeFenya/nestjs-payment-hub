import { Inject, Injectable } from '@nestjs/common'
import {
	TbankModuleOptions,
	TbankOptionsSymbol
} from '../../../common/interfaces'
import { TbankHttpClient } from '../core/http/tbank.http-client'
import { TpayVersionEnum } from './enums'
import type { TpayLinkResponse, TpayStatusResponse } from './interfaces'

@Injectable()
export class TbankTpayService {
	public constructor(
		private readonly http: TbankHttpClient,
		@Inject(TbankOptionsSymbol) private readonly cfg: TbankModuleOptions
	) {}

	// GET /v2/TinkoffPay/terminals/{TerminalKey}/status (Bearer) :contentReference[oaicite:5]{index=5}
	public status(): Promise<TpayStatusResponse> {
		return this.http.getBearer(
			`v2/TinkoffPay/terminals/${encodeURIComponent(this.cfg.terminalKey)}/status`
		)
	}

	// GET /v2/TinkoffPay/transactions/{paymentId}/versions/{version}/link (Bearer) :contentReference[oaicite:6]{index=6}
	public link(
		paymentId: number,
		version: TpayVersionEnum = TpayVersionEnum.V2_0
	): Promise<TpayLinkResponse> {
		return this.http.getBearer(
			`v2/TinkoffPay/transactions/${encodeURIComponent(String(paymentId))}/versions/${encodeURIComponent(version)}/link`
		)
	}

	// GET /v2/TinkoffPay/{paymentId}/QR (Bearer, image/svg) :contentReference[oaicite:7]{index=7}
	public qr(paymentId: number): Promise<string> {
		return this.http.getBearer(
			`v2/TinkoffPay/${encodeURIComponent(String(paymentId))}/QR`
		)
	}
}
