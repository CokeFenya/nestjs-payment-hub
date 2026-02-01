// src/payment-hub.module.ts
import { Global, Module, type DynamicModule } from '@nestjs/common'

import type {
	PaymentHubModuleAsyncOptions,
	PaymentHubModuleOptions
} from './common/interfaces'

import { PaymentHubContextModule } from './common/payment-hub-context.module'
import { YookassaModule } from './modules/yookassa/yookassa.module'
import { PaymentHubService } from './payment-hub.service'

@Global()
@Module({})
export class PaymentHubModule {
	public static forRoot(options: PaymentHubModuleOptions): DynamicModule {
		return {
			module: PaymentHubModule,
			imports: [PaymentHubContextModule.forRoot(options), YookassaModule],
			providers: [PaymentHubService],
			exports: [PaymentHubService],
			global: true
		}
	}

	public static forRootAsync(
		options: PaymentHubModuleAsyncOptions
	): DynamicModule {
		return {
			module: PaymentHubModule,
			imports: [
				PaymentHubContextModule.forRootAsync(options),
				YookassaModule
			],
			providers: [PaymentHubService],
			exports: [PaymentHubService],
			global: true
		}
	}
}
