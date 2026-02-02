export interface SbpGetQrResponse {
	TerminalKey: string
	OrderId?: string

	Success: boolean
	ErrorCode: string
	Message?: string
	Details?: string

	PaymentId: number
	Data?: string // PAYLOAD (url/deeplink) или IMAGE (svg text)
	RequestKey?: string
}
