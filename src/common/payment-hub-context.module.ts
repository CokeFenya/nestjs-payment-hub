import { Global, Module, type DynamicModule } from '@nestjs/common'
import type {
	PaymentHubModuleAsyncOptions,
	PaymentHubModuleOptions
} from './interfaces'
import { PaymentHubOptionsSymbol } from './interfaces'

@Global()
@Module({})
export class PaymentHubContextModule {
	public static forRoot(options: PaymentHubModuleOptions): DynamicModule {
		return {
			module: PaymentHubContextModule,
			providers: [
				{ provide: PaymentHubOptionsSymbol, useValue: options }
			],
			exports: [PaymentHubOptionsSymbol],
			global: true
		}
	}

	public static forRootAsync(
		options: PaymentHubModuleAsyncOptions
	): DynamicModule {
		return {
			module: PaymentHubContextModule,
			imports: options.imports ?? [],
			providers: [
				{
					provide: PaymentHubOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject ?? []
				}
			],
			exports: [PaymentHubOptionsSymbol],
			global: true
		}
	}
}
