/**
 * Типы апдейтов (вебхуки) Crypto Pay API.
 * Минимально тебе нужен invoice_paid.
 */
export enum CryptoWebhookUpdateTypeEnum {
	INVOICE_PAID = 'invoice_paid',
	INVOICE_EXPIRED = 'invoice_expired'
}
