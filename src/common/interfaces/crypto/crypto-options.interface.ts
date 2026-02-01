import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'

// ✅ стабильный токен
export const CryptoPayOptionsSymbol = Symbol.for(
	'nestjs-payment-hub:CryptoPayOptions'
)

/**
 * Настройки модуля CryptoPay.
 */
export type CryptoPayModuleOptions = {
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

export type CryptoPayModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<CryptoPayModuleOptions>, 'useFactory' | 'inject'>
