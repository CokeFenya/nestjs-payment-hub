export const TBANK_OPTIONS = Symbol('TBANK_OPTIONS')

export const TBANK_DEFAULTS = {
	baseUrl: 'https://securepay.tinkoff.ru',
	timeoutMs: 15_000
} as const
