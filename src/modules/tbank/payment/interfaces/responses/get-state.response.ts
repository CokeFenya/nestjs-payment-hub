import type { TbankPaymentStatusEnum } from '../../enums'
import type { TbankCommonResponse } from './common.response'

export interface TbankGetStateResponse extends TbankCommonResponse {
	PaymentId?: string
	OrderId?: string
	Status?: TbankPaymentStatusEnum | string
	Amount?: number

	RebillId?: string
	CardId?: string
	CustomerKey?: string
}
