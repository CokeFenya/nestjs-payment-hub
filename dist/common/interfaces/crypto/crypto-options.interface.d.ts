import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';
export declare const CryptoPayOptionsSymbol: unique symbol;
/**
 * Настройки модуля CryptoPay.
 */
export type CryptoPayModuleOptions = {
    /**
     * API token из @CryptoBot -> Crypto Pay -> Create App
     */
    token: string;
    /**
     * true -> https://testnet-pay.crypt.bot
     * false/undefined -> https://pay.crypt.bot
     */
    testnet?: boolean;
};
export type CryptoPayModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<CryptoPayModuleOptions>, 'useFactory' | 'inject'>;
