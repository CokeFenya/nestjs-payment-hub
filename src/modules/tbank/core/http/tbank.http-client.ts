import { Inject, Injectable } from '@nestjs/common'
import axios, { type AxiosInstance } from 'axios'
import { createHash } from 'crypto'
import type { TbankOptions } from '../../../../common/interfaces/tbank/tbank-options.interface'
import { TBANK_DEFAULTS, TBANK_OPTIONS } from '../config/tbank.constants'
import { TbankError } from './errors/tbank.error'

type Primitive = string | number | boolean | null | undefined

function isPlainObject(v: unknown): v is Record<string, unknown> {
	return typeof v === 'object' && v !== null && !Array.isArray(v)
}

/**
 * Token (подпись) T-Bank:
 * - учитываем только поля ВЕРХНЕГО уровня (примитивы), вложенные объекты/массивы исключаем
 * - исключаем Token и Password
 * - добавляем Password
 * - сортируем ключи по алфавиту
 * - склеиваем значения
 * - sha256 hex
 *
 * Док: формирование Token. :contentReference[oaicite:0]{index=0}
 */
export function createTbankToken(
	root: Record<string, unknown>,
	password: string,
	excludeKeys: readonly string[] = ['Token', 'Password']
): string {
	const pairs: Array<[string, string]> = []

	for (const [k, v] of Object.entries(root)) {
		if (excludeKeys.includes(k)) continue
		if (isPlainObject(v) || Array.isArray(v)) continue

		const pv = v as Primitive
		if (pv === undefined) continue
		pairs.push([k, String(pv)])
	}

	pairs.push(['Password', password])
	pairs.sort(([a], [b]) => a.localeCompare(b))

	const concatenated = pairs.map(([, v]) => v).join('')
	return createHash('sha256').update(concatenated, 'utf8').digest('hex')
}

@Injectable()
export class TbankHttpClient {
	private readonly http: AxiosInstance
	private readonly terminalKey: string
	private readonly password: string

	public constructor(@Inject(TBANK_OPTIONS) options: TbankOptions) {
		const baseUrl = options.baseUrl ?? TBANK_DEFAULTS.baseUrl
		const timeout = options.timeoutMs ?? TBANK_DEFAULTS.timeoutMs

		this.terminalKey = options.terminalKey
		this.password = options.password

		this.http = axios.create({
			baseURL: baseUrl,
			timeout,
			headers: { 'Content-Type': 'application/json' }
		})
	}

	public async post<TResponse, TBody extends object>(
		path: string,
		body: TBody
	): Promise<TResponse> {
		const signed = this.sign(body)
		const { data } = await this.http.post<TResponse>(path, signed)

		if (isPlainObject(data) && data.Success === false) {
			throw new TbankError(
				String(data.Message ?? data.Details ?? 'T-Bank API error'),
				data
			)
		}

		return data
	}

	public async get<TResponse>(
		path: string,
		params?: Record<string, unknown>
	): Promise<TResponse> {
		const { data } = await this.http.get<TResponse>(path, { params })
		return data
	}

	private sign<TBody extends object>(
		body: TBody
	): TBody & Record<string, unknown> {
		const merged: Record<string, unknown> = {
			...(body as Record<string, unknown>)
		}

		if (!merged.TerminalKey) merged.TerminalKey = this.terminalKey

		if (!merged.Token) {
			merged.Token = createTbankToken(merged, this.password)
		}

		return merged as TBody & Record<string, unknown>
	}
}
