import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import type { CryptoPayModuleOptions } from './crypto/crypto-options.interface';
import type { YookassaModuleOptions } from './yookassa/yookassa-options.interface';
export declare const PaymentHubOptionsSymbol: unique symbol;
export type PaymentHubModuleOptions = {
    yookassa?: YookassaModuleOptions;
    crypto?: CryptoPayModuleOptions;
};
export type PaymentHubModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<PaymentHubModuleOptions>, 'useFactory' | 'inject'>;
