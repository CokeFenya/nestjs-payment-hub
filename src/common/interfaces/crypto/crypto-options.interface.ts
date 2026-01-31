import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'

export const CryptoOptionsSymbol = Symbol('CryptoOptionsSymbol')

export type CryptoModuleOptions = {
	/**
	 * API Token из @CryptoBot -> Crypto Pay -> Create App
	 * Передаётся в заголовке Crypto-Pay-API-Token
	 */
	apiToken: string

	/**
	 * testnet-pay.crypt.bot вместо pay.crypt.bot
	 */
	testnet?: boolean

	/**
	 * Необязательно, если хочешь переопределять вручную.
	 * По умолчанию берём из testnet флага.
	 */
	baseUrl?: string
}

export type CryptoModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<CryptoModuleOptions>, 'useFactory' | 'inject'>
