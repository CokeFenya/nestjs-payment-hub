import { Injectable } from '@nestjs/common'
import { TbankHttpClient } from '../core/http/tbank.http-client'
import type { SbpGetQrRequest, SbpGetQrResponse } from './interfaces'

@Injectable()
export class TbankSbpService {
	public constructor(private readonly http: TbankHttpClient) {}

	// POST /v2/GetQr (Token sha256 in body) :contentReference[oaicite:3]{index=3}
	public getQr(data: SbpGetQrRequest): Promise<SbpGetQrResponse> {
		return this.http.postSigned('GetQr', data)
	}
}
