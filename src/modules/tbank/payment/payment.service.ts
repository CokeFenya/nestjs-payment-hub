import { Injectable } from '@nestjs/common'
import { TbankHttpClient } from '../core/http/tbank.http-client'
import type {
	TbankGetStateRequest,
	TbankGetStateResponse,
	TbankInitRequest,
	TbankInitResponse
} from './interfaces'

@Injectable()
export class TbankPaymentService {
	public constructor(private readonly http: TbankHttpClient) {}

	public init(data: TbankInitRequest): Promise<TbankInitResponse> {
		return this.http.post('/v2/Init', data)
	}

	public getState(
		data: TbankGetStateRequest
	): Promise<TbankGetStateResponse> {
		return this.http.post('/v2/GetState', data)
	}
}
