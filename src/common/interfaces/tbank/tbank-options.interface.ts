export const TbankOptionsSymbol = Symbol.for('nestjs-payment-hub:TbankOptions')

export type TbankModuleOptions = {
	terminalKey: string
	password: string
	baseUrl?: string
	timeoutMs?: number
}
