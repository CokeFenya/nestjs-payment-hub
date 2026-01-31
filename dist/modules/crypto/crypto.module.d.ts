import { type DynamicModule } from '@nestjs/common';
import { type CryptoModuleAsyncOptions } from '../../common/interfaces/crypto/crypto-options.interface';
/**
 * Вариант для PaymentHub: crypto optional
 */
export type CryptoModuleAsyncOptionalOptions = Pick<CryptoModuleAsyncOptions, 'imports' | 'inject' | 'useFactory'>;
export declare class CryptoModule {
    /**
     * Обычный async (если хочешь crypto всегда обязателен)
     */
    static forRootAsync(options: CryptoModuleAsyncOptions): DynamicModule;
    /**
     * Optional async (для PaymentHub): если crypto конфига нет — провайдеров "как бы нет"
     */
    static forRootAsyncOptional(options: CryptoModuleAsyncOptionalOptions): DynamicModule;
}
