// src/modules/crypto/core/http/crypto.http-client.ts
import { Inject, Injectable } from '@nestjs/common'
import { request } from 'undici'
import {
	CryptoOptionsSymbol,
	type CryptoModuleOptions
} from '../../../../common/interfaces/crypto/crypto-options.interface'
import { resolveCryptoApiUrl } from '../config/crypto.constants'
import { CryptoPayError } from './errors/crypto.error'

type CryptoApiOk<T> = { ok: true; result: T }
type CryptoApiFail = { ok: false; error: string }
type CryptoApiResponse<T> = CryptoApiOk<T> | CryptoApiFail

function isCryptoFail<T>(x: CryptoApiResponse<T>): x is CryptoApiFail {
	return x.ok === false
}

@Injectable()
export class CryptoHttpClient {
	private readonly apiBase: string

	public constructor(
		@Inject(CryptoOptionsSymbol)
		private readonly config: CryptoModuleOptions
	) {
		this.apiBase = resolveCryptoApiUrl(config)
	}

	public async request<T = any>(options: {
		method: 'GET' | 'POST'
		path: string // например: /createInvoice
		data?: any
		params?: Record<string, any>
	}): Promise<T> {
		const url = this.buildUrl(options.path, options.params)

		try {
			const res = await request(url, {
				method: options.method,
				headersTimeout: 15000,
				bodyTimeout: 15000,
				headers: {
					'Content-Type': 'application/json',
					'Crypto-Pay-API-Token': this.config.apiToken
				},
				body: options.data ? JSON.stringify(options.data) : undefined
			})

			const text = await res.body.text()

			if (res.statusCode >= 400) {
				throw new CryptoPayError(
					'http_error',
					`HTTP ${res.statusCode}`,
					{
						statusCode: res.statusCode,
						raw: text
					}
				)
			}

			let payload: CryptoApiResponse<T>
			try {
				payload = JSON.parse(text) as CryptoApiResponse<T>
			} catch {
				throw new CryptoPayError('invalid_json', text, {
					statusCode: res.statusCode,
					raw: text
				})
			}

			if (isCryptoFail(payload)) {
				throw new CryptoPayError(payload.error, payload.error, {
					statusCode: res.statusCode,
					raw: text
				})
			}

			return payload.result
		} catch (error: any) {
			if (error instanceof CryptoPayError) throw error
			throw new CryptoPayError(
				error?.type || 'crypto_pay_error',
				error?.message || 'Unknown Crypto Pay error',
				error
			)
		}
	}

	public get<T>(path: string, params?: Record<string, any>) {
		return this.request<T>({ method: 'GET', path, params })
	}

	public post<T>(path: string, data?: any) {
		return this.request<T>({ method: 'POST', path, data })
	}

	private buildUrl(path: string, params?: Record<string, any>) {
		const p = path.startsWith('/') ? path : `/${path}`
		let full = `${this.apiBase}${p}`

		if (params && typeof params === 'object') {
			const qp = new URLSearchParams()
			for (const [k, v] of Object.entries(params)) {
				if (v === undefined || v === null) continue
				qp.set(k, String(v))
			}
			const qs = qp.toString()
			if (qs) full += `?${qs}`
		}

		return full
	}
}
