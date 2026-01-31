import type { CryptoInvoice } from '../../payment/interfaces'
import type { CryptoWebhookUpdateTypeEnum } from '../enums'

export interface CryptoWebhookUpdate {
	update_id: number
	update_type: CryptoWebhookUpdateTypeEnum
	request_date: string
	payload: CryptoInvoice
}
