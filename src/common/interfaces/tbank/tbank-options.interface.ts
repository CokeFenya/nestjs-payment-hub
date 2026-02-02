export const TbankOptionsSymbol = Symbol.for('nestjs-payment-hub:TbankOptions')

export type TbankModuleOptions = {
	terminalKey: string
	password: string
	/**
	 * Если нужно принудительно гонять через тестовый контур.
	 * Если false/undefined — используем production baseUrl.
	 */
	isTest?: boolean

	/**
	 * Если у тебя уже есть корпоративный прокси как в YooKassa — оставим.
	 */
	proxyUrl?: string
}
