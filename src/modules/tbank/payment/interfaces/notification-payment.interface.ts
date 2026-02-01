import type { TbankPaymentStatusEnum } from '../../payment/enums'

export interface TbankNotificationPayment {
	TerminalKey: string
	OrderId: string
	Success: boolean
	Status: TbankPaymentStatusEnum | string
	PaymentId: string
	Amount?: number

	ErrorCode?: string
	Message?: string
	Details?: string

	Token: string
}
