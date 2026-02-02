import type { PayTypeEnum, TbankLanguageEnum } from '../../enums'

export interface InitRequest {
	Amount: number // копейки
	OrderId: string
	Description?: string

	PayType?: PayTypeEnum
	Language?: TbankLanguageEnum

	NotificationURL?: string
	SuccessURL?: string
	FailURL?: string

	RedirectDueDate?: string // date-time

	CustomerKey?: string
	Recurrent?: 'Y'

	// DATA/Receipt можно добавить позже (они вложенные и не участвуют в Token) :contentReference[oaicite:9]{index=9}
	DATA?: Record<string, string>
	Receipt?: any
}
