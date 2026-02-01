import { CryptoPayInvoiceStatusEnum } from '../enums/invoice-status.enum'

export interface CryptoPayInvoice {
	invoice_id: number
	hash: string

	asset: string
	amount: string

	// fiat mode
	currency_type?: string
	fiat?: string
	paid_asset?: string
	paid_amount?: string
	paid_usd_rate?: string
	paid_fiat_rate?: string
	accepted_assets?: string[]

	fee_asset?: string
	fee_amount?: number
	fee_in_usd?: string

	// urls
	bot_invoice_url?: string
	mini_app_invoice_url?: string
	web_app_invoice_url?: string

	description?: string
	status: CryptoPayInvoiceStatusEnum

	created_at: string
	paid_at?: string
	expiration_date?: string

	allow_comments: boolean
	allow_anonymous: boolean

	paid_anonymously: boolean
	comment?: string
	hidden_message?: string
	payload?: string

	paid_btn_name?: string
	paid_btn_url?: string
}
