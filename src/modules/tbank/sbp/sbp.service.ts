import { Injectable } from '@nestjs/common'
import { TbankHttpClient } from '../core/http/tbank.http-client'
import { GetQrStateRequest } from './interfaces/requests/get-qr-state.request'
import { GetQrRequest } from './interfaces/requests/get-qr.request'
import { GetQrStateResponse } from './interfaces/responses/get-qr-state.response'
import { GetQrResponse } from './interfaces/responses/get-qr.response'

@Injectable()
export class TbankSbpService {
	public constructor(private readonly http: TbankHttpClient) {}

	public getQr(data: GetQrRequest): Promise<GetQrResponse> {
		return this.http.post('GetQr', data) // /v2/GetQr :contentReference[oaicite:20]{index=20}
	}

	public getQrState(data: GetQrStateRequest): Promise<GetQrStateResponse> {
		return this.http.post('GetQrState', data) // /v2/GetQrState :contentReference[oaicite:21]{index=21}
	}
}
