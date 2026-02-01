// src/common/interfaces/payment-hub-options.interface.ts
import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'
import { CryptoPayModuleOptions } from './crypto/crypto-options.interface'
import type { YookassaModuleOptions } from './yookassa/yookassa-options.interface'

export const PaymentHubOptionsSymbol = Symbol('PaymentHubOptionsSymbol')

/**
 * Настройки модуля PaymentHub.
 * Каждый провайдер хранит свой конфиг в отдельном поле.
 */
export type PaymentHubModuleOptions = {
	/**
	 * Настройки провайдера YooKassa.
	 */
	yookassa?: YookassaModuleOptions

	crypto?: CryptoPayModuleOptions

	/**
	 * Настройки провайдера UnitPay.
	 */
	unitpay?: any

	/**
	 * Настройки провайдера T-Bank.
	 */
	tbank?: any
}

/**
 * Асинхронная конфигурация модуля PaymentHub.
 */
export type PaymentHubModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<PaymentHubModuleOptions>, 'useFactory' | 'inject'>
