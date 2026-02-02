import { Inject, Injectable } from '@nestjs/common'
import { Agent, ProxyAgent, request } from 'undici'

import {
	TbankModuleOptions,
	TbankOptionsSymbol
} from '../../../../common/interfaces'
import {
	TBANK_API_BASE_URL_PROD,
	TBANK_API_BASE_URL_TEST,
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
	// ВАЖНО: dispatcher всегда задан, чтобы НЕ использовать глобальный proxy dispatcher
	private readonly dispatcher: Agent | ProxyAgent
	private readonly baseUrl: string

	public constructor(
		@Inject(TbankOptionsSymbol) private readonly cfg: TbankModuleOptions
	) {
		this.baseUrl = (
			cfg.isTest ? TBANK_API_BASE_URL_TEST : TBANK_API_BASE_URL_PROD
		).replace(/\/+$/, '')

		// ✅ если прокси задан явно для TBANK — используем его
		// ✅ иначе — принудительно прямой Agent (обходит global setGlobalDispatcher)
		this.dispatcher = cfg.proxyUrl
			? new ProxyAgent(cfg.proxyUrl)
			: new Agent()
	}

	public async post<T = any>(
		path: string,
		data: Record<string, any>
	): Promise<T> {
		const url = `${this.baseUrl}/${TBANK_API_VERSION}/${path.replace(/^\/+/, '')}`

		const body: Record<string, any> = {
			...data,
			TerminalKey: data.TerminalKey ?? this.cfg.terminalKey
		}

		body.Token = buildTbankToken(body, this.cfg.password)

		try {
			const res = await request(url, {
				method: 'POST',
				dispatcher: this.dispatcher, // ✅ всегда НЕ глобальный
				headersTimeout: 15000,
				bodyTimeout: 15000,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})

			let json: unknown
			try {
				json = await res.body.json()
			} catch {
				const text = await res.body.text()
				throw new TbankError(
					'tbank_non_json_response',
					`Non-JSON response (HTTP ${res.statusCode})`,
					{
						url,
						statusCode: res.statusCode,
						responseHead: text.slice(0, 4000),
						bodySent: body
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

			if (isTbankApiErrorShape(json) && json.Success === false) {
				throw new TbankError(
					'tbank_api_error',
					json.Message ?? 'T-Bank API error',
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
