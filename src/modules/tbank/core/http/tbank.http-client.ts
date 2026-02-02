// core/http/tbank.http-client.ts
import { Inject, Injectable } from '@nestjs/common'
import { Agent, ProxyAgent, request } from 'undici'
import {
	TbankModuleOptions,
	TbankOptionsSymbol
} from '../../../../common/interfaces'
import {
	TBANK_API_BASE_URL,
	TBANK_API_VERSION
} from '../config/tbank.constants'
import { buildTbankToken } from '../utils/tbank-token.util'
import { TbankError } from './errors/tbank.error'

type TbankApiErrorShape = {
	Success: boolean
	Message?: string
	Details?: string
	ErrorCode?: string
	[k: string]: any
}
function isTbankApiErrorShape(x: unknown): x is TbankApiErrorShape {
	return !!x && typeof x === 'object' && 'Success' in (x as any)
}

@Injectable()
export class TbankHttpClient {
	private readonly dispatcher: Agent | ProxyAgent
	private readonly baseUrl: string

	public constructor(
		@Inject(TbankOptionsSymbol) private readonly cfg: TbankModuleOptions
	) {
		this.baseUrl = TBANK_API_BASE_URL.replace(/\/+$/, '')
		this.dispatcher = cfg.proxyUrl
			? new ProxyAgent(cfg.proxyUrl)
			: new Agent()
	}

	/** Классические методы эквайринга: /v2/Init, /v2/GetState и т.п. (Token = sha256) */
	public async postSigned<T = any>(
		path: string,
		data: Record<string, any>
	): Promise<T> {
		const url = `${this.baseUrl}/${TBANK_API_VERSION}/${path.replace(/^\/+/, '')}`

		const body: Record<string, any> = {
			...data,
			TerminalKey: data.TerminalKey ?? this.cfg.terminalKey
		}
		body.Token = buildTbankToken(body, this.cfg.password)

		return this.doJsonRequest<T>(url, 'POST', body, {
			'Content-Type': 'application/json'
		})
	}

	/** Bearer GET для T-Pay/SberPay */
	public async getBearerText(
		path: string,
		headers?: Record<string, string>
	): Promise<string> {
		const url = `${this.baseUrl}/${path.replace(/^\/+/, '')}`

		const res = await request(url, {
			method: 'GET',
			dispatcher: this.dispatcher,
			headersTimeout: 15000,
			bodyTimeout: 15000,
			headers: {
				Authorization: `Bearer ${this.cfg.bearerToken}`,
				...(headers ?? {})
			}
		})

		const text = await res.body.text()

		if (res.statusCode >= 400) {
			throw new TbankError('tbank_http_error', `HTTP ${res.statusCode}`, {
				url,
				responseHead: text.slice(0, 4000)
			})
		}

		return text
	}

	/** Bearer GET, ожидаем JSON (link/status и т.п.) */
	public async getBearer<T = any>(
		path: string,
		headers?: Record<string, string>
	): Promise<T> {
		const url = `${this.baseUrl}/${path.replace(/^\/+/, '')}`

		return this.doJsonRequest<T>(url, 'GET', undefined, {
			Authorization: `Bearer ${this.cfg.bearerToken}`,
			...(headers ?? {})
		})
	}

	/** Bearer POST для cashbox/SendClosingReceipt */
	public async postBearer<T = any>(
		path: string,
		data: Record<string, any>
	): Promise<T> {
		const url = `${this.baseUrl}/${path.replace(/^\/+/, '')}`
		return this.doJsonRequest<T>(url, 'POST', data, {
			Authorization: `Bearer ${this.cfg.bearerToken}`,
			'Content-Type': 'application/json'
		})
	}

	private async doJsonRequest<T>(
		url: string,
		method: 'GET' | 'POST',
		body?: any,
		headers?: Record<string, string>
	): Promise<T> {
		try {
			const res = await request(url, {
				method,
				dispatcher: this.dispatcher,
				headersTimeout: 15000,
				bodyTimeout: 15000,
				headers,
				body: body === undefined ? undefined : JSON.stringify(body)
			})

			const text = await res.body.text()

			let json: unknown
			try {
				json = text ? JSON.parse(text) : {}
			} catch {
				throw new TbankError(
					'tbank_non_json_response',
					`Non-JSON response (HTTP ${res.statusCode})`,
					{
						url,
						statusCode: res.statusCode,
						responseHead: text.slice(0, 4000)
					}
				)
			}

			if (res.statusCode >= 400) {
				throw new TbankError(
					'tbank_http_error',
					`HTTP ${res.statusCode}`,
					json
				)
			}

			// В классическом API часто есть Success=false — проверяем универсально
			if (isTbankApiErrorShape(json) && json.Success === false) {
				throw new TbankError(
					'tbank_api_error',
					(json as any).Message ?? 'T-Bank API error',
					json
				)
			}

			return json as T
		} catch (e: any) {
			if (e instanceof TbankError) throw e
			throw new TbankError(
				e?.type ?? 'tbank_error',
				e?.message ?? 'Unknown T-Bank error',
				e
			)
		}
	}
}
