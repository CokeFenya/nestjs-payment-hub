export interface TbankCancelRequest {
	PaymentId: string
	Amount?: number
	IP?: string
	Receipt?: unknown
	TerminalKey?: string
	Token?: string
}
