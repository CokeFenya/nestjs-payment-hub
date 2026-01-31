import { CurrencyEnum } from '../../../../common/enums';
import { CryptoAssetEnum } from '../enums/crypto-asset.enum';
import { CryptoCurrencyTypeEnum } from '../enums/crypto-currency-type.enum';
export interface CryptoInvoice {
    invoice_id: number;
    status: string;
    currency_type: CryptoCurrencyTypeEnum;
    asset?: CryptoAssetEnum;
    fiat?: CurrencyEnum;
    amount: string;
    description?: string;
    payload?: string;
    /**
     * Ссылка, которую ты будешь отдавать как confirmationUrl
     * (в доке pay_url deprecated, используют bot_invoice_url)
     */
    bot_invoice_url?: string;
    created_at?: string;
    expiration_date?: string;
    paid_asset?: CryptoAssetEnum;
    paid_amount?: string;
    paid_usd_rate?: string;
    paid_fiat_rate?: string;
    fee_asset?: CryptoAssetEnum;
    fee_amount?: string;
    accepted_assets?: string;
}
