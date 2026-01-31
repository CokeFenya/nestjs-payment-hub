/**
 * Типы апдейтов (вебхуки) Crypto Pay API.
 * Сейчас в доке гарантированно указан invoice_paid.
 */
export enum CryptoWebhookUpdateTypeEnum {
	INVOICE_PAID = 'invoice_paid'
	// иногда встречается invoice_expired, но в доке в секции webhook явно указан invoice_paid
}
