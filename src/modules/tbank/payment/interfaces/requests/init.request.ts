import type { TbankPayTypeEnum, TbankPaymentMethodEnum } from '../../enums'

export interface TbankInitRequest {
	Amount: number
	OrderId: string

	Description?: string
	CustomerKey?: string
	Recurrent?: 'Y'

	PayType?: TbankPayTypeEnum
	Language?: 'ru' | 'en'

	NotificationURL?: string
	SuccessURL?: string
	FailURL?: string

	RedirectDueDate?: string
	IP?: string

	/**
	 * Произвольные данные (удобно передавать metadata/провайдер/тип оплаты и т.д.)
	 * В Token не участвует (это объект)
	 */
	DATA?: Record<string, string>

	Receipt?: unknown

	TerminalKey?: string
	Token?: string

	/**
	 * НЕ отправляется в T-Bank. Это твой выбор метода для UI/логики.
	 * (можешь писать в DATA и/или использовать для последующих вызовов SBP/T-Pay и т.д.)
	 */
	__paymentMethod?: TbankPaymentMethodEnum
}
