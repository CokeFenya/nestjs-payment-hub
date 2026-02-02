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

@Injectable()
export class TbankHttpClient {
	private readonly dispatcher: Agent | ProxyAgent
	private readonly baseUrl: string

	public constructor(
		@Inject(TbankOptionsSymbol) private readonly cfg: TbankModuleOptions
	) {
		this.baseUrl = (
			cfg.isTest ? TBANK_API_BASE_URL_TEST : TBANK_API_BASE_URL_PROD
		).replace(/\/+$/, '')

		// ✅ ВАЖНО: если proxyUrl не задан — всё равно ставим Agent(),
		// чтобы перебить setGlobalDispatcher(ProxyAgent)
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

		const res = await request(url, {
			method: 'POST',
			dispatcher: this.dispatcher, // ✅ всегда задан
			headersTimeout: 15000,
			bodyTimeout: 15000,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'User-Agent': 'mcstarbound-backend/1.0'
			},
			body: JSON.stringify(body)
		})

		// дальше как у тебя...
		const text = await res.body.text()

		// ✅ если пришёл HTML — логируем текст
		try {
			const json = JSON.parse(text)

			if (res.statusCode >= 400) {
				throw new TbankError(
					'tbank_http_error',
					`HTTP ${res.statusCode}`,
					json
				)
			}

			if (
				json &&
				typeof json === 'object' &&
				'Success' in json &&
				json.Success === false
			) {
				throw new TbankError(
					'tbank_api_error',
					(json as any).Message ?? 'T-Bank API error',
					json
				)
			}

			return json as T
		} catch {
			throw new TbankError(
				'tbank_non_json_response',
				`Non-JSON response (HTTP ${res.statusCode})`,
				{
					url,
					statusCode: res.statusCode,
					responseHead: text.slice(0, 500),
					bodySent: body
				}
			)
		}
	}
}
