import { Module } from '@nestjs/common'
import type { PaymentHubModuleOptions } from '../../../common/interfaces/payment-hub-options.interface'
import { PaymentHubOptionsSymbol } from '../../../common/interfaces/payment-hub-options.interface'
import type { TbankOptions } from '../../../common/interfaces/tbank/tbank-options.interface'

import { TBANK_OPTIONS } from './config/tbank.constants'
import { TbankHttpClient } from './http/tbank.http-client'

@Module({
	providers: [
		{
			provide: TBANK_OPTIONS,
			useFactory: (opts: PaymentHubModuleOptions): TbankOptions => {
				if (!opts?.tbank) {
					throw new Error(
						'Tbank options are missing. Provide { tbank: { terminalKey, password } } in PaymentHubModule.forRoot(...)'
					)
				}
				return opts.tbank
			},
			inject: [PaymentHubOptionsSymbol]
		},
		TbankHttpClient
	],
	exports: [TBANK_OPTIONS, TbankHttpClient]
})
export class TbankCoreModule {}
