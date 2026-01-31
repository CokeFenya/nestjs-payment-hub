export declare const CRYPTO_PAY_MAINNET_API_URL = "https://pay.crypt.bot/api";
export declare const CRYPTO_PAY_TESTNET_API_URL = "https://testnet-pay.crypt.bot/api";
export declare function resolveCryptoApiUrl(opts: {
    testnet?: boolean;
    baseUrl?: string;
}): string;
