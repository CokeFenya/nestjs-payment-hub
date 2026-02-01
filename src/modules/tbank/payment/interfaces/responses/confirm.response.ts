import type { TbankPaymentStatusEnum } from '../../enums'
import type { TbankCommonResponse } from './common.response'

export interface TbankConfirmResponse extends TbankCommonResponse {
	PaymentId?: string
	OrderId?: string
	Status?: TbankPaymentStatusEnum | string
	Amount?: number
}
