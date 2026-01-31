// src/modules/crypto/core/config/crypto.constants.ts
export const CRYPTO_PAY_MAINNET_API_URL = 'https://pay.crypt.bot/api'
export const CRYPTO_PAY_TESTNET_API_URL = 'https://testnet-pay.crypt.bot/api'

export function resolveCryptoApiUrl(opts: {
	testnet?: boolean
	baseUrl?: string
}) {
	if (opts.baseUrl) return opts.baseUrl.replace(/\/+$/, '')
	return opts.testnet
		? CRYPTO_PAY_TESTNET_API_URL
		: CRYPTO_PAY_MAINNET_API_URL
}
