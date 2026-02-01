export type TbankSbpDataType = 'PAYLOAD' | 'IMAGE' | 'QR'

export interface TbankSbpGetQrRequest {
	PaymentId: string
	DataType?: TbankSbpDataType | null
	BankId?: string | null
	TerminalKey?: string
	Token?: string
}
