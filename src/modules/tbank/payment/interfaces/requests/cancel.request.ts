export interface CancelRequest {
	PaymentId: string
	Amount?: number // копейки :contentReference[oaicite:11]{index=11}
	IP?: string
	Receipt?: any
}
