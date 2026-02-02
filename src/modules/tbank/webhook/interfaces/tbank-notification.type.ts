import type { TbankAddCardNotification } from './notification-add-card.interface'
import type { TbankPaymentNotification } from './notification-payment.interface'
import type { TbankQrNotification } from './notification-qr.interface'

export type TbankNotification =
	| TbankPaymentNotification
	| TbankAddCardNotification
	| TbankQrNotification
