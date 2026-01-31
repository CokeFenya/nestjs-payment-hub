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

@Module({})
export class CryptoModule {
	public static forRoot(options: CryptoModuleOptions): DynamicModule {
		return {
			module: CryptoModule,
			imports: [CryptoPaymentModule],
			providers: [
				{ provide: CryptoOptionsSymbol, useValue: options },
				CryptoHttpClient,
				CryptoProviderService
			],
			exports: [CryptoProviderService, CryptoHttpClient]
		}
	}

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
				CryptoProviderService
			],
			exports: [CryptoProviderService, CryptoHttpClient]
		}
	}
}
