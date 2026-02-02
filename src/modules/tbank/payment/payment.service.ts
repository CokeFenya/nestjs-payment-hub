import { Injectable } from '@nestjs/common'
import { TbankHttpClient } from '../core/http/tbank.http-client'

import type {
	CancelRequest,
	ConfirmRequest,
	FinishAuthorizeRequest,
	GetStateRequest,
	GetStateResponse,
	InitRequest,
	InitResponse
} from './interfaces'

@Injectable()
export class TbankPaymentService {
	public constructor(private readonly http: TbankHttpClient) {}

	public init(data: InitRequest): Promise<InitResponse> {
		return this.http.post('Init', data) // /v2/Init :contentReference[oaicite:12]{index=12}
	}

	public finishAuthorize(data: FinishAuthorizeRequest): Promise<any> {
		return this.http.post('FinishAuthorize', data) // /v2/FinishAuthorize :contentReference[oaicite:13]{index=13}
	}

	public confirm(data: ConfirmRequest): Promise<any> {
		return this.http.post('Confirm', data) // /v2/Confirm :contentReference[oaicite:14]{index=14}
	}

	public cancel(data: CancelRequest): Promise<any> {
		return this.http.post('Cancel', data) // /v2/Cancel :contentReference[oaicite:15]{index=15}
	}

	public getState(data: GetStateRequest): Promise<GetStateResponse> {
		return this.http.post('GetState', data) // /v2/GetState :contentReference[oaicite:16]{index=16}
	}
}
