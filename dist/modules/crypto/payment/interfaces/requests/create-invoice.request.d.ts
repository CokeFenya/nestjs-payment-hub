import { CryptoAssetEnum, CryptoCurrencyTypeEnum, CryptoPaidButtonNameEnum } from '../../enums';
export type CreateCryptoInvoiceRequest = {
    /**
     * crypto | fiat. Если fiat — обязательно fiat=RUB и можно accepted_assets.
     */
    currency_type?: CryptoCurrencyTypeEnum;
    /**
     * Required если currency_type=crypto
     */
    asset?: CryptoAssetEnum;
    /**
     * Required если currency_type=fiat (например RUB)
     */
    fiat?: string;
    /**
     * Список ассетов через запятую (только для fiat).
     * Например: "USDT,TON,BTC"
     */
    accepted_assets?: string;
    /**
     * Сумма инвойса (float как string), например "100.00"
     */
    amount: string;
    description?: string;
    hidden_message?: string;
    paid_btn_name?: CryptoPaidButtonNameEnum;
    paid_btn_url?: string;
    /**
     * Любые данные до 4kb: transactionId, userId, purpose, playerName...
     */
    payload?: string;
    allow_comments?: boolean;
    allow_anonymous?: boolean;
    /**
     * Лимит времени оплаты в секундах (1..2678400)
     */
    expires_in?: number;
    /**
     * Новое поле (1.5.1): swap_to
     */
    swap_to?: string;
};
