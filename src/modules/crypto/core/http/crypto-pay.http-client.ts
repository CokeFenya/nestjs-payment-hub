import { CryptoPayModuleOptions } from '../../../../common/interfaces'

export class CryptoPayHttpClient {
	private readonly baseUrl: string
	private readonly token: string

	public constructor(cfg: CryptoPayModuleOptions) {
		this.token = cfg.token
		this.baseUrl = cfg.testnet
			? 'https://testnet-pay.crypt.bot'
			: 'https://pay.crypt.bot'
	}

	public async get<T>(
		method: string,
		params?: Record<string, any>
	): Promise<T> {
		const url = new URL(`/api/${method}`, this.baseUrl)
		if (params) {
			for (const [k, v] of Object.entries(params)) {
				if (v === undefined || v === null) continue
				url.searchParams.set(k, String(v))
			}
		}

		const res = await fetch(url, {
			method: 'GET',
			headers: {
				'Crypto-Pay-API-Token': this.token
			}
		})

		if (!res.ok) {
			const text = await res.text().catch(() => '')
			throw new Error(
				`[CryptoPay] GET ${method} failed: ${res.status} ${text}`
			)
		}

		return (await res.json()) as T
	}

	public async post<T>(
		method: string,
		body?: Record<string, any>
	): Promise<T> {
		const url = new URL(`/api/${method}`, this.baseUrl)

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Crypto-Pay-API-Token': this.token,
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : undefined
		})

		if (!res.ok) {
			const text = await res.text().catch(() => '')
			throw new Error(
				`[CryptoPay] POST ${method} failed: ${res.status} ${text}`
			)
		}

		return (await res.json()) as T
	}
}
