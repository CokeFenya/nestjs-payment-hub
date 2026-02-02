import type { TbankPaymentStatusEnum } from '../../payment/enums'

/**
 * Уведомление о платеже (NotificationPayment).
 * Набор полей может отличаться по статусам/сценариям, поэтому многое optional.
 */
export interface TbankPaymentNotification {
	TerminalKey: string
	OrderId?: string

	Success: boolean
	Status?: TbankPaymentStatusEnum | string

	PaymentId: string
	ErrorCode: string

	Amount?: number

	// Карточные поля (обычно в AUTHORIZED/CONFIRMED):
	CardId?: string
	Pan?: string
	ExpDate?: string
	RebillId?: string

	// Доп.параметры (если включены):
	Data?: Record<string, any>

	// Чек/фискализация может приходить как вложенный объект:
	Receipt?: any

	Token: string
}
