import {
	Module,
	type DynamicModule,
	type FactoryProvider
} from '@nestjs/common'

import {
	YookassaOptionsSymbol,
	type YookassaModuleAsyncOptions,
	type YookassaModuleOptions
} from '../../common/interfaces'

import { YookassaHttpClient } from './core/http/yookassa.http-client'

import { YookassaInvoiceModule } from './invoice/invoice.module'
import { YookassaPaymentMethodModule } from './payment-method/payment-method.module'
import { YookassaPaymentModule } from './payment/payment.module'
import { YookassaRefundModule } from './refund/refund.module'
import { YookassaProviderService } from './yookassa-provider.service'

@Module({})
export class YookassaModule {
	public static forRoot(options: YookassaModuleOptions): DynamicModule {
		return {
			module: YookassaModule,
			imports: [
				YookassaPaymentModule,
				YookassaRefundModule,
				YookassaInvoiceModule,
				YookassaPaymentMethodModule
			],
			providers: [
				{ provide: YookassaOptionsSymbol, useValue: options },

				{
					provide: YookassaHttpClient,
					useFactory: (cfg: YookassaModuleOptions) =>
						new YookassaHttpClient(cfg),
					inject: [YookassaOptionsSymbol]
				},

				YookassaProviderService
			],
			exports: [YookassaProviderService, YookassaHttpClient]
		}
	}

	public static forRootAsync(
		options: YookassaModuleAsyncOptions
	): DynamicModule {
		const asyncOptionsProvider: FactoryProvider<YookassaModuleOptions> = {
			provide: YookassaOptionsSymbol,
			useFactory: options.useFactory,
			// TS иногда ругается на readonly — приводим
			inject: (options.inject ?? []) as any
		}

		return {
			module: YookassaModule,
			imports: [
				...(options.imports || []),
				YookassaPaymentModule,
				YookassaRefundModule,
				YookassaInvoiceModule,
				YookassaPaymentMethodModule
			],
			providers: [
				asyncOptionsProvider,

				{
					provide: YookassaHttpClient,
					useFactory: (cfg: YookassaModuleOptions) =>
						new YookassaHttpClient(cfg),
					inject: [YookassaOptionsSymbol]
				},

				YookassaProviderService
			],
			exports: [YookassaProviderService, YookassaHttpClient]
		}
	}
}
