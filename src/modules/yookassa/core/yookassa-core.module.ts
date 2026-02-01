import { Module } from '@nestjs/common'

import type {
	PaymentHubModuleOptions,
	YookassaModuleOptions
} from '../../../common/interfaces'
import {
	PaymentHubOptionsSymbol,
	YookassaOptionsSymbol
} from '../../../common/interfaces'

import { PaymentHubContextModule } from '../../../common/payment-hub-context.module'
import { YookassaHttpClient } from './http/yookassa.http-client'

@Module({
	imports: [PaymentHubContextModule],
	providers: [
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
		}
	],
	exports: [YookassaOptionsSymbol, YookassaHttpClient]
})
export class YookassaCoreModule {}
