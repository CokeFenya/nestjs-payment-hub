import type { TbankPaymentStatusEnum } from '../../enums'
import type { TbankCommonResponse } from './common.response'

export interface TbankCancelResponse extends TbankCommonResponse {
	PaymentId?: string
	OrderId?: string
	Status?: TbankPaymentStatusEnum | string
	Amount?: number
}
