// webhook/interfaces/notification-payment.interface.ts
export interface TbankPaymentNotification {
	TerminalKey: string
	OrderId?: string
	Success: boolean
	Status?: string
	PaymentId: number | string
	ErrorCode: string
	Amount?: number
	CardId?: number | string
	Pan?: string
	ExpDate?: string
	Token: string
	Receipt?: any
	Data?: Record<string, any>
}
