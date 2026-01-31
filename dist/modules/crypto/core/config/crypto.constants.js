"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRYPTO_PAY_TESTNET_API_URL = exports.CRYPTO_PAY_MAINNET_API_URL = void 0;
exports.resolveCryptoApiUrl = resolveCryptoApiUrl;
// src/modules/crypto/core/config/crypto.constants.ts
exports.CRYPTO_PAY_MAINNET_API_URL = 'https://pay.crypt.bot/api';
exports.CRYPTO_PAY_TESTNET_API_URL = 'https://testnet-pay.crypt.bot/api';
function resolveCryptoApiUrl(opts) {
    if (opts.baseUrl)
        return opts.baseUrl.replace(/\/+$/, '');
    return opts.testnet
        ? exports.CRYPTO_PAY_TESTNET_API_URL
        : exports.CRYPTO_PAY_MAINNET_API_URL;
}
