// common/interfaces/tbank/tbank-options.interface.ts
export const TbankOptionsSymbol = Symbol.for('nestjs-payment-hub:TbankOptions')

export type TbankModuleOptions = {
	terminalKey: string
	password: string

	/**
	 * Bearer API Token (T-API) — нужен для:
	 * - T-Pay status/link/qr
	 * - SberPay link/qr
	 * - cashbox/SendClosingReceipt
	 */
	bearerToken: string

	proxyUrl?: string
}
