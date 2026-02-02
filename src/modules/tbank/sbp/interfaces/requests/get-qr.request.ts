import { SbpQrDataTypeEnum } from '../../enums'

export interface SbpGetQrRequest {
	PaymentId: number
	DataType?: SbpQrDataTypeEnum // default PAYLOAD
	BankId?: string // uuid; только для PAYLOAD
}
