export const TbankOptionsSymbol = Symbol.for('nestjs-payment-hub:TbankOptions')

export type TbankModuleOptions = {
	/**
	 * TerminalKey (идентификатор терминала)
	 */
	terminalKey: string

	/**
	 * Password (пароль терминала) — для формирования Token
	 */
	password: string

	/**
	 * Базовый URL API (обычно https://securepay.tinkoff.ru)
	 */
	baseUrl?: string

	/**
	 * Таймаут HTTP (мс)
	 */
	timeoutMs?: number
}
