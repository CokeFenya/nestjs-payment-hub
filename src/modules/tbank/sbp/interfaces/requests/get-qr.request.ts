import { SbpDataTypeEnum } from '../../enums/sbp-data-type.enum'

export interface GetQrRequest {
	PaymentId: number
	DataType?: SbpDataTypeEnum // default PAYLOAD :contentReference[oaicite:19]{index=19}
	BankId?: string
}
