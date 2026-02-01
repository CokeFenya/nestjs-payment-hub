import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import type { YookassaModuleOptions } from './yookassa/yookassa-options.interface';
export declare const PaymentHubOptionsSymbol: unique symbol;
/**
 * Настройки модуля PaymentHub.
 * Каждый провайдер хранит свой конфиг в отдельном поле.
 */
export type PaymentHubModuleOptions = {
    /**
     * Настройки провайдера YooKassa.
     */
    yookassa?: YookassaModuleOptions;
    /**
     * Настройки провайдера UnitPay.
     */
    unitpay?: any;
    /**
     * Настройки провайдера T-Bank.
     */
    tbank?: any;
};
/**
 * Асинхронная конфигурация модуля PaymentHub.
 */
export type PaymentHubModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<PaymentHubModuleOptions>, 'useFactory' | 'inject'>;
