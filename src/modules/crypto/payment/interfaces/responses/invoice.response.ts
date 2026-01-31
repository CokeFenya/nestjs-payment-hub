// src/modules/crypto/payment/interfaces/responses/invoice.response.ts
import type { CryptoAssetEnum, CryptoCurrencyTypeEnum } from '../../enums'
import { CryptoInvoiceStatusEnum } from '../../enums'

export type CryptoInvoice = {
	invoice_id: number
	status: CryptoInvoiceStatusEnum

	hash?: string

	bot_invoice_url?: string
	web_app_invoice_url?: string
	mini_app_invoice_url?: string

	currency_type?: CryptoCurrencyTypeEnum
	asset?: CryptoAssetEnum

	fiat?: string
	accepted_assets?: string

	amount: string

	description?: string
	payload?: string

	paid_asset?: string
	paid_amount?: string

	created_at?: string
	expiration_date?: string
}
