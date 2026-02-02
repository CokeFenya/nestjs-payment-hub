/**
 * Тип входящего уведомления (внутренний enum для удобства роутинга).
 * В теле нотификаций T-Bank отдельного поля "type" может не быть,
 * поэтому определяем вид по набору полей.
 */
export enum TbankNotificationKindEnum {
	PAYMENT = 'payment',
	ADD_CARD = 'add_card',
	QR = 'qr',
	UNKNOWN = 'unknown'
}
