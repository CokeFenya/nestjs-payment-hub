// src/payment-hub.module.ts
import { Global, Module, type DynamicModule } from '@nestjs/common'

import type {
	PaymentHubModuleAsyncOptions,
	PaymentHubModuleOptions,
	YookassaModuleOptions
} from './common/interfaces'
import {
	PaymentHubOptionsSymbol,
	YookassaOptionsSymbol
} from './common/interfaces'

import {
	CryptoModuleOptions,
	CryptoOptionsSymbol
} from './common/interfaces/crypto/crypto-options.interface'
import { CryptoHttpClient } from './modules/crypto/core/http/crypto.http-client'
import { CryptoModule } from './modules/crypto/crypto.module'

import { YookassaHttpClient } from './modules/yookassa/core/http/yookassa.http-client'
import { YookassaProviderService } from './modules/yookassa/yookassa-provider.service'
import { YookassaModule } from './modules/yookassa/yookassa.module'

import { PaymentHubService } from './payment-hub.service'

@Global()
@Module({})
export class PaymentHubModule {
	/**
	 * Метод для регистрации модуля с синхронными параметрами.
	 * Этот метод используется для конфигурации модуля с заранее заданными параметрами.
	 * @param {PaymentHubModuleOptions} options - Настройки для конфигурации PaymentHub.
	 * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
	 *
	 * @example
	 * ```ts
	 * PaymentHubModule.forRoot({
	 *   yookassa: {
	 *     shopId: 'your_shop_id',
	 *     apiKey: 'your_api_key',
	 *   },
	 *   crypto: {
	 *     apiToken: 'token',
	 *     testnet: true,
	 *   }
	 * });
	 * ```
	 */
	public static forRoot(options: PaymentHubModuleOptions): DynamicModule {
		const hasCrypto = Boolean(options.crypto)

		return {
			module: PaymentHubModule,
			imports: [
				// Подключаем провайдера YooKassa целиком
				YookassaModule,

				// Crypto подключаем только если он реально сконфигурирован
				...(hasCrypto ? [CryptoModule] : [])
			],
			providers: [
				// 1) Кладём весь hub-config в DI (yookassa/crypto/tbank/...)
				{ provide: PaymentHubOptionsSymbol, useValue: options },

				// ===== YooKassa как было =====
				{
					provide: YookassaOptionsSymbol,
					useFactory: (
						hub: PaymentHubModuleOptions
					): YookassaModuleOptions => {
						const cfg = hub.yookassa
						if (!cfg) {
							throw new Error(
								'[PaymentHub] YooKassa config is missing. Provide options.yookassa'
							)
						}
						return cfg
					},
					inject: [PaymentHubOptionsSymbol]
				},
				{
					provide: YookassaHttpClient,
					useFactory: (cfg: YookassaModuleOptions) =>
						new YookassaHttpClient(cfg),
					inject: [YookassaOptionsSymbol]
				},

				// ===== Crypto (optional) =====
				...(hasCrypto
					? [
							{
								provide: CryptoOptionsSymbol,
								useFactory: (
									hub: PaymentHubModuleOptions
								): CryptoModuleOptions =>
									hub.crypto as CryptoModuleOptions,
								inject: [PaymentHubOptionsSymbol]
							},
							{
								provide: CryptoHttpClient,
								useFactory: (cfg: CryptoModuleOptions) =>
									new CryptoHttpClient(cfg),
								inject: [CryptoOptionsSymbol]
							}
						]
					: []),

				// 4) Хаб, который прокидывает доступ к провайдерам (hub.yookassa / hub.crypto)
				PaymentHubService
			],
			exports: [
				PaymentHubService,

				// наружу по желанию
				YookassaHttpClient,
				...(hasCrypto ? [CryptoHttpClient] : []),

				YookassaProviderService
			],
			global: true
		}
	}

	/**
	 * Метод для регистрации модуля с асинхронной конфигурацией.
	 * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
	 */
	public static forRootAsync(
		options: PaymentHubModuleAsyncOptions
	): DynamicModule {
		// В async-режиме мы НЕ знаем заранее, есть crypto или нет (оно придёт из useFactory),
		// поэтому: импортируем CryptoModule всегда, но провайдеры crypto делаем "мягкими"
		// (НЕ throw), и НЕ создаём CryptoHttpClient если cfg нет.
		//
		// ВАЖНО: чтобы это работало, CryptoModule не должен требовать CryptoHttpClient на старте.
		// Сейчас у тебя CryptoPaymentService использует CryptoHttpClient -> значит CryptoHttpClient должен существовать,
		// если CryptoModule импортирован. Поэтому в async лучше делать импорт CryptoModule условным через отдельный "wrapper".
		//
		// Но чтобы НЕ ЛОМАТЬ, сделаем проще:
		// 1) CryptoModule импортируем ВСЕГДА
		// 2) CryptoHttpClient создаём, только если cfg есть
		// 3) А в PaymentHubService ты ставишь @Optional() crypto?: CryptoProviderService
		//
		// Это сработает, если CryptoProviderService / CryptoPaymentService НЕ будут инстанцироваться без CryptoHttpClient.
		// Если будут — тогда нужно условно импортировать CryptoModule (чуть сложнее, скажешь — сделаю).

		return {
			module: PaymentHubModule,
			imports: [
				...(options.imports || []),

				// Подключаем провайдера YooKassa целиком
				YookassaModule,

				// CryptoModule подключаем (см. комментарий выше)
				CryptoModule
			],
			providers: [
				// 1) Асинхронно получаем весь hub-config в DI (yookassa/crypto/tbank/...)
				{
					provide: PaymentHubOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject ?? []
				},

				// ===== YooKassa как было =====
				{
					provide: YookassaOptionsSymbol,
					useFactory: (
						hub: PaymentHubModuleOptions
					): YookassaModuleOptions => {
						const cfg = hub.yookassa
						if (!cfg) {
							throw new Error(
								'[PaymentHub] YooKassa config is missing. Provide options.yookassa'
							)
						}
						return cfg
					},
					inject: [PaymentHubOptionsSymbol]
				},
				{
					provide: YookassaHttpClient,
					useFactory: (cfg: YookassaModuleOptions) =>
						new YookassaHttpClient(cfg),
					inject: [YookassaOptionsSymbol]
				},

				// ===== Crypto (optional) =====
				{
					provide: CryptoOptionsSymbol,
					useFactory: (
						hub: PaymentHubModuleOptions
					): CryptoModuleOptions | undefined => hub.crypto,
					inject: [PaymentHubOptionsSymbol]
				},
				{
					provide: CryptoHttpClient,
					useFactory: (cfg?: CryptoModuleOptions) => {
						// НЕ throw: чтобы можно было стартовать без crypto
						if (!cfg) return undefined as any
						return new CryptoHttpClient(cfg)
					},
					inject: [CryptoOptionsSymbol]
				},

				PaymentHubService
			],
			exports: [
				PaymentHubService,
				YookassaHttpClient,
				CryptoHttpClient,
				YookassaProviderService
			],
			global: true
		}
	}
}
