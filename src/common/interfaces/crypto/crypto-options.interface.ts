export interface CryptoPayModuleOptions {
	/**
	 * API token из @CryptoBot -> Crypto Pay -> Create App
	 */
	token: string

	/**
	 * true -> https://testnet-pay.crypt.bot
	 * false/undefined -> https://pay.crypt.bot
	 */
	testnet?: boolean
}
