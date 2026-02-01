import { CryptoPayAssetEnum } from '../../enums/asset.enum';
import { CryptoPayCurrencyTypeEnum } from '../../enums/currency-type.enum';
export interface CreateCryptoInvoiceRequest {
    /**
     * For crypto invoices: asset + amount
     */
    asset?: CryptoPayAssetEnum;
    amount?: string;
    /**
     * For fiat invoices: currency_type=fiat + fiat + amount (+ accepted_assets)
     */
    currency_type?: CryptoPayCurrencyTypeEnum;
    fiat?: string;
    accepted_assets?: CryptoPayAssetEnum[];
    description?: string;
    hidden_message?: string;
    paid_btn_name?: 'viewItem' | 'openChannel' | 'openBot' | 'callback';
    paid_btn_url?: string;
    payload?: string;
    allow_comments?: boolean;
    allow_anonymous?: boolean;
    /**
     * seconds
     */
    expires_in?: number;
}
