import {
	Module,
	type DynamicModule,
	type FactoryProvider
} from '@nestjs/common'

import {
	CryptoOptionsSymbol,
	type CryptoModuleAsyncOptions,
	type CryptoModuleOptions
} from '../../common/interfaces/crypto/crypto-options.interface'

import { CryptoHttpClient } from './core/http/crypto.http-client'
import { CryptoProviderService } from './crypto-provider.service'
import { CryptoPaymentModule } from './payment/payment.module'
import { CryptoPaymentService } from './payment/payment.service'

/**
 * Вариант для PaymentHub: crypto optional
 */
export type CryptoModuleAsyncOptionalOptions = Pick<
	CryptoModuleAsyncOptions,
	'imports' | 'inject' | 'useFactory'
>

@Module({})
export class CryptoModule {
	/**
	 * Обычный async (если хочешь crypto всегда обязателен)
	 */
	public static forRootAsync(
		options: CryptoModuleAsyncOptions
	): DynamicModule {
		const asyncOptionsProvider: FactoryProvider<CryptoModuleOptions> = {
			provide: CryptoOptionsSymbol,
			useFactory: options.useFactory,
			inject: (options.inject ?? []) as any
		}

		return {
			module: CryptoModule,
			imports: [...(options.imports || []), CryptoPaymentModule],
			providers: [
				asyncOptionsProvider,
				CryptoHttpClient,
				CryptoPaymentService,
				CryptoProviderService
			],
			exports: [CryptoProviderService, CryptoHttpClient]
		}
	}

	/**
	 * Optional async (для PaymentHub): если crypto конфига нет — провайдеров "как бы нет"
	 */
	public static forRootAsyncOptional(
		options: CryptoModuleAsyncOptionalOptions
	): DynamicModule {
		// 1) options (может быть undefined)
		const asyncOptionsProvider: FactoryProvider<
			CryptoModuleOptions | undefined
		> = {
			provide: CryptoOptionsSymbol,
			useFactory: options.useFactory,
			inject: (options.inject ?? []) as any
		}

		// 2) http client (может быть undefined)
		const httpProvider: FactoryProvider<CryptoHttpClient | undefined> = {
			provide: CryptoHttpClient,
			useFactory: (cfg?: CryptoModuleOptions) => {
				if (!cfg) return undefined
				// CryptoHttpClient у тебя сейчас принимает config через @Inject(CryptoOptionsSymbol),
				// но мы создаём руками — значит убери @Inject внутри конструктора И принимай cfg параметром,
				// ЛИБО оставь как есть и делай "new CryptoHttpClient(cfg as any)".
				return new CryptoHttpClient(cfg as any)
			},
			inject: [CryptoOptionsSymbol]
		}

		// 3) payment service (может быть undefined)
		const paymentProvider: FactoryProvider<
			CryptoPaymentService | undefined
		> = {
			provide: CryptoPaymentService,
			useFactory: (http?: CryptoHttpClient) => {
				if (!http) return undefined
				return new CryptoPaymentService(http)
			},
			inject: [CryptoHttpClient]
		}

		// 4) provider service (может быть undefined)
		const providerProvider: FactoryProvider<
			CryptoProviderService | undefined
		> = {
			provide: CryptoProviderService,
			useFactory: (payments?: CryptoPaymentService) => {
				if (!payments) return undefined
				return new CryptoProviderService(payments)
			},
			inject: [CryptoPaymentService]
		}

		return {
			module: CryptoModule,
			imports: [...(options.imports || []), CryptoPaymentModule],
			providers: [
				asyncOptionsProvider,
				httpProvider,
				paymentProvider,
				providerProvider
			],
			exports: [CryptoProviderService, CryptoHttpClient]
		}
	}
}
