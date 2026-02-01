// =====================================
// 2) UPDATE: src/payment-hub.module.ts
// =====================================
import { Global, Module, type DynamicModule } from '@nestjs/common'

import type {
	PaymentHubModuleAsyncOptions,
	PaymentHubModuleOptions
} from './common/interfaces'
import { PaymentHubOptionsSymbol } from './common/interfaces'

import { PaymentHubContextModule } from './common/payment-hub-context.module'
import { YookassaModule } from './modules/yookassa/yookassa.module'
import { PaymentHubService } from './payment-hub.service'

@Global()
@Module({})
export class PaymentHubModule {
	public static forRoot(options: PaymentHubModuleOptions): DynamicModule {
		return {
			module: PaymentHubModule,
			imports: [
				PaymentHubContextModule, // ✅ important
				YookassaModule
			],
			providers: [
				{ provide: PaymentHubOptionsSymbol, useValue: options },
				PaymentHubService
			],
			exports: [
				PaymentHubService,
				PaymentHubOptionsSymbol // ✅ export token too
			],
			global: true
		}
	}

	public static forRootAsync(
		options: PaymentHubModuleAsyncOptions
	): DynamicModule {
		return {
			module: PaymentHubModule,
			imports: [
				PaymentHubContextModule, // ✅ important
				...(options.imports || []),
				YookassaModule
			],
			providers: [
				{
					provide: PaymentHubOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject ?? []
				},
				PaymentHubService
			],
			exports: [PaymentHubService, PaymentHubOptionsSymbol],
			global: true
		}
	}
}
