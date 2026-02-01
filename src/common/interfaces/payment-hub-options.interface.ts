import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'
import type { CryptoPayModuleOptions } from './crypto/crypto-options.interface'
import type { TbankModuleOptions } from './tbank/tbank-options.interface'
import type { YookassaModuleOptions } from './yookassa/yookassa-options.interface'

export const PaymentHubOptionsSymbol = Symbol.for(
	'nestjs-payment-hub:PaymentHubOptions'
)

export type PaymentHubModuleOptions = {
	yookassa?: YookassaModuleOptions
	crypto?: CryptoPayModuleOptions
	tbank?: TbankModuleOptions
}

export type PaymentHubModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<PaymentHubModuleOptions>, 'useFactory' | 'inject'>
