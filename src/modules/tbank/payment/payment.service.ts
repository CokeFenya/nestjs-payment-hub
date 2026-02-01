import { Injectable } from '@nestjs/common'
import { TbankHttpClient } from '../core/http/tbank.http-client'

import type {
	TbankGetStateRequest,
	TbankInitRequest,
	TbankMirPayDeepLinkRequest,
	TbankSberPayLinkParams,
	TbankSbpGetQrRequest,
	TbankTPayLinkParams
} from './interfaces/requests'

import type {
	TbankGetStateResponse,
	TbankInitResponse,
	TbankMirPayDeepLinkResponse,
	TbankSberPayLinkResponse,
	TbankSbpGetQrResponse,
	TbankTPayLinkResponse
} from './interfaces/responses'

@Injectable()
export class TbankPaymentService {
	public constructor(private readonly http: TbankHttpClient) {}

	/** Создание платежа (редирект на PaymentURL) */
	public init(data: TbankInitRequest): Promise<TbankInitResponse> {
		return this.http.post<TbankInitResponse, TbankInitRequest>(
			'/v2/Init',
			data
		)
	}

	/** Проверка статуса */
	public getState(
		data: TbankGetStateRequest
	): Promise<TbankGetStateResponse> {
		return this.http.post<TbankGetStateResponse, TbankGetStateRequest>(
			'/v2/GetState',
			data
		)
	}

	// ===== SBP =====
	public sbpGetQr(
		data: TbankSbpGetQrRequest
	): Promise<TbankSbpGetQrResponse> {
		return this.http.post<TbankSbpGetQrResponse, TbankSbpGetQrRequest>(
			'/v2/GetQr',
			data
		)
	}

	// ===== T-Pay =====
	public tPayQr(paymentId: number): Promise<string> {
		// возвращает SVG строкой
		return this.http.get<string>(`/v2/TinkoffPay/${paymentId}/QR`)
	}

	public tPayLink(
		params: TbankTPayLinkParams
	): Promise<TbankTPayLinkResponse> {
		const { paymentId, version } = params
		return this.http.get<TbankTPayLinkResponse>(
			`/v2/TinkoffPay/transactions/${paymentId}/versions/${version}/link`
		)
	}

	// ===== SberPay =====
	public sberPayLink(
		params: TbankSberPayLinkParams
	): Promise<TbankSberPayLinkResponse> {
		const { paymentId } = params
		return this.http.get<TbankSberPayLinkResponse>(
			`/v2/SberPay/transactions/${paymentId}/link`
		)
	}

	// ===== MirPay =====
	public mirPayDeepLink(
		data: TbankMirPayDeepLinkRequest
	): Promise<TbankMirPayDeepLinkResponse> {
		return this.http.post<
			TbankMirPayDeepLinkResponse,
			TbankMirPayDeepLinkRequest
		>('/v2/MirPay/GetDeepLink', data)
	}
}
