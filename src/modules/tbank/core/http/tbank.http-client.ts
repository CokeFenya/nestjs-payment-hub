import { Inject, Injectable } from '@nestjs/common'
import { ProxyAgent, request } from 'undici'

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
	private readonly dispatcher?: ProxyAgent
	private readonly baseUrl: string

	public constructor(
		@Inject(TbankOptionsSymbol) private readonly cfg: TbankModuleOptions
	) {
		this.baseUrl = (
			cfg.isTest ? TBANK_API_BASE_URL_TEST : TBANK_API_BASE_URL_PROD
		).replace(/\/+$/, '')
		this.dispatcher = cfg.proxyUrl
			? new ProxyAgent(cfg.proxyUrl)
			: undefined
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
				dispatcher: this.dispatcher,
				headersTimeout: 15000,
				bodyTimeout: 15000,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			})

			const json: unknown = await res.body.json()

			if (res.statusCode >= 400) {
				throw new TbankError(
					'tbank_http_error',
					`HTTP ${res.statusCode}`,
					json
				)
			}

			// T-Bank часто отдаёт 200 + Success=false
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
