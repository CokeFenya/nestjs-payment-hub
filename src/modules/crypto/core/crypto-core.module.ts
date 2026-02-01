import { Module } from '@nestjs/common'

import type {
	CryptoPayModuleOptions,
	PaymentHubModuleOptions
} from '../../../common/interfaces'
import {
	CryptoPayOptionsSymbol,
	PaymentHubOptionsSymbol
} from '../../../common/interfaces'
import { PaymentHubContextModule } from '../../../common/payment-hub-context.module'

import { CryptoPayHttpClient } from './http/crypto-pay.http-client'

@Module({
	imports: [PaymentHubContextModule],
	providers: [
		{
			provide: CryptoPayOptionsSymbol,
			useFactory: (
				hub: PaymentHubModuleOptions
			): CryptoPayModuleOptions => {
				const cfg = hub.crypto
				if (!cfg) {
					throw new Error(
						'[PaymentHub] CryptoPay config is missing. Provide options.crypto'
					)
				}
				return cfg
			},
			inject: [PaymentHubOptionsSymbol]
		},
		{
			provide: CryptoPayHttpClient,
			useFactory: (cfg: CryptoPayModuleOptions) =>
				new CryptoPayHttpClient(cfg),
			inject: [CryptoPayOptionsSymbol]
		}
	],
	exports: [CryptoPayOptionsSymbol, CryptoPayHttpClient]
})
export class CryptoCoreModule {}
