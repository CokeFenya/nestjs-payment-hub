import { Global, Module, type DynamicModule } from '@nestjs/common'

import type { PaymentHubModuleAsyncOptions } from './common/interfaces'

import { CryptoModule } from './modules/crypto/crypto.module'
import { YookassaModule } from './modules/yookassa/yookassa.module'
import { PaymentHubService } from './payment-hub.service'

@Global()
@Module({})
export class PaymentHubModule {
	/**
	 * Всегда async.
	 * - yookassa обязателен
	 * - crypto optional
	 */
	public static forRootAsync(
		options: PaymentHubModuleAsyncOptions
	): DynamicModule {
		return {
			module: PaymentHubModule,
			imports: [
				// YooKassa обязателен
				YookassaModule.forRootAsync({
					imports: options.imports,
					inject: options.inject,
					useFactory: async (...args: any[]) => {
						const hub = await options.useFactory(...args)
						if (!hub?.yookassa) {
							throw new Error(
								'[PaymentHub] YooKassa config is missing. Provide options.yookassa'
							)
						}
						return hub.yookassa
					}
				}),

				// Crypto optional (НЕ падаем, если конфига нет)
				CryptoModule.forRootAsyncOptional({
					imports: options.imports,
					inject: options.inject,
					useFactory: async (...args: any[]) => {
						const hub = await options.useFactory(...args)
						return hub?.crypto
					}
				})
			],
			providers: [PaymentHubService],
			exports: [PaymentHubService],
			global: true
		}
	}
}
