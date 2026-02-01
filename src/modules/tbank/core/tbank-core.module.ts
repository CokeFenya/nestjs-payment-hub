// src/modules/tbank/core/tbank-core.module.ts
import { Module } from '@nestjs/common'

import type {
	PaymentHubModuleOptions,
	TbankModuleOptions
} from '../../../common/interfaces'
import { PaymentHubOptionsSymbol } from '../../../common/interfaces'

import { PaymentHubContextModule } from '../../../common/payment-hub-context.module'
import { TbankOptionsSymbol } from './config/tbank.constants'
import { TbankHttpClient } from './http/tbank.http-client'

@Module({
	imports: [PaymentHubContextModule],
	providers: [
		{
			provide: TbankOptionsSymbol,
			useFactory: (hub: PaymentHubModuleOptions): TbankModuleOptions => {
				const cfg = hub.tbank
				if (!cfg) {
					throw new Error(
						'[PaymentHub] T-Bank config is missing. Provide options.tbank'
					)
				}
				return cfg
			},
			inject: [PaymentHubOptionsSymbol]
		},
		{
			provide: TbankHttpClient,
			useFactory: (cfg: TbankModuleOptions) => new TbankHttpClient(cfg),
			inject: [TbankOptionsSymbol]
		}
	],
	exports: [TbankOptionsSymbol, TbankHttpClient]
})
export class TbankCoreModule {}
