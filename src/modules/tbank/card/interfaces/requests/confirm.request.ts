export interface ConfirmRequest {
	PaymentId: string
	Amount?: number // копейки, можно <= Amount авторизации :contentReference[oaicite:10]{index=10}
	IP?: string
}
