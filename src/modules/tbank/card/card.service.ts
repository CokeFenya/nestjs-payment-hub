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
export class TbankCardService {
	public constructor(private readonly http: TbankHttpClient) {}

	public init(data: InitRequest): Promise<InitResponse> {
		return this.http.postSigned('Init', data)
	}

	public finishAuthorize(data: FinishAuthorizeRequest): Promise<any> {
		return this.http.postSigned('FinishAuthorize', data)
	}

	public confirm(data: ConfirmRequest): Promise<any> {
		return this.http.postSigned('Confirm', data)
	}

	public cancel(data: CancelRequest): Promise<any> {
		return this.http.postSigned('Cancel', data)
	}

	public getState(data: GetStateRequest): Promise<GetStateResponse> {
		return this.http.postSigned('GetState', data)
	}
}
