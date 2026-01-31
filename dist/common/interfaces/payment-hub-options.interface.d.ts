import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { CryptoModuleOptions } from './crypto/crypto-options.interface';
import type { YookassaModuleOptions } from './yookassa/yookassa-options.interface';
export declare const PaymentHubOptionsSymbol: unique symbol;
/**
 * Настройки модуля PaymentHub.
 * Каждый провайдер хранит свой конфиг в отдельном поле.
 */
export type PaymentHubModuleOptions = {
    yookassa?: YookassaModuleOptions;
    crypto?: CryptoModuleOptions;
    unitpay?: any;
    tbank?: any;
};
/**
 * Асинхронная конфигурация модуля PaymentHub.
 */
export type PaymentHubModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<PaymentHubModuleOptions>, 'useFactory' | 'inject'>;
