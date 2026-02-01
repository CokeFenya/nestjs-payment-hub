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

import { YookassaHttpClient } from './modules/yookassa/core/http/yookassa.http-client'

import { YookassaInvoiceModule } from './modules/yookassa/invoice/invoice.module'
import { YookassaPaymentMethodService } from './modules/yookassa/payment-method/payment-method.service'
import { YookassaPaymentModule } from './modules/yookassa/payment/payment.module'
import { YookassaRefundModule } from './modules/yookassa/refund/refund.module'
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
	 *   tbank: {
	 *     // пока модуля нет — просто лежит в конфиге
	 *   }
	 * });
	 * ```
	 */
	public static forRoot(options: PaymentHubModuleOptions): DynamicModule {
		return {
			module: PaymentHubModule,
			imports: [
				// Пока подключаем только YooKassa-домены
				YookassaPaymentModule,
				YookassaRefundModule,
				YookassaInvoiceModule,
				YookassaPaymentMethodService,

				// Агрегирующий модуль провайдера YooKassa
				YookassaModule
			],
			providers: [
				// 1) Кладём весь hub-config в DI (yookassa/tbank/...)
				{ provide: PaymentHubOptionsSymbol, useValue: options },

				// 2) Достаём yookassa-config и прокидываем в "родной" токен YooKassa
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

				// 3) Создаём YooKassa client как раньше
				{
					provide: YookassaHttpClient,
					useFactory: (cfg: YookassaModuleOptions) =>
						new YookassaHttpClient(cfg),
					inject: [YookassaOptionsSymbol]
				},

				// 4) Хаб, который прокидывает доступ к провайдерам (hub.yookassa)
				PaymentHubService
			],
			exports: [
				PaymentHubService,
				YookassaHttpClient,

				// Экспортируем провайдера YooKassa наружу при необходимости
				YookassaProviderService
			],
			global: true
		}
	}

	/**
	 * Метод для регистрации модуля с асинхронной конфигурацией.
	 * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
	 * @param {PaymentHubModuleAsyncOptions} options - Асинхронные параметры для конфигурации PaymentHub.
	 * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
	 *
	 * @example
	 * ```ts
	 * PaymentHubModule.forRootAsync({
	 *   imports: [ConfigModule],
	 *   inject: [ConfigService],
	 *   useFactory: (cfg: ConfigService) => ({
	 *     yookassa: {
	 *       shopId: cfg.getOrThrow('YOOKASSA_SHOP_ID'),
	 *       apiKey: cfg.getOrThrow('YOOKASSA_SECRET_KEY'),
	 *       proxyUrl: cfg.get('YOOKASSA_PROXY_URL'),
	 *     },
	 *     tbank: {
	 *       // пока модуля нет — просто лежит в конфиге
	 *     },
	 *   }),
	 * })
	 * ```
	 */
	public static forRootAsync(
		options: PaymentHubModuleAsyncOptions
	): DynamicModule {
		return {
			module: PaymentHubModule,
			imports: [
				...(options.imports || []),

				// Пока подключаем только YooKassa-домены
				YookassaPaymentModule,
				YookassaRefundModule,
				YookassaInvoiceModule,
				YookassaPaymentMethodService,

				// Агрегирующий модуль провайдера YooKassa
				YookassaModule
			],
			providers: [
				// 1) Асинхронно получаем весь hub-config в DI (yookassa/tbank/...)
				{
					provide: PaymentHubOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject ?? []
				},

				// 2) Достаём yookassa-config и прокидываем в "родной" токен YooKassa
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

				// 3) Создаём YooKassa client как раньше
				{
					provide: YookassaHttpClient,
					useFactory: (cfg: YookassaModuleOptions) =>
						new YookassaHttpClient(cfg),
					inject: [YookassaOptionsSymbol]
				},

				// 4) Хаб, который прокидывает доступ к провайдерам (hub.yookassa)
				PaymentHubService
			],
			exports: [
				PaymentHubService,
				YookassaHttpClient,

				// Экспортируем провайдера YooKassa наружу при необходимости
				YookassaProviderService
			],
			global: true
		}
	}
}
