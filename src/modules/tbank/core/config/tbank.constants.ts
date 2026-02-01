// src/modules/tbank/core/config/tbank.constants.ts
export const TbankOptionsSymbol = Symbol.for('nestjs-payment-hub:TbankOptions')

export const TBANK_DEFAULTS = {
	baseUrl: 'https://securepay.tinkoff.ru',
	timeoutMs: 15000
} as const
