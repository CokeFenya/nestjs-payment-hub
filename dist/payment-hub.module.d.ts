import { type DynamicModule } from '@nestjs/common';
import type { PaymentHubModuleAsyncOptions, PaymentHubModuleOptions } from './common/interfaces';
export declare class PaymentHubModule {
    /**
     * Метод для регистрации модуля с синхронными параметрами.
     */
    static forRoot(options: PaymentHubModuleOptions): DynamicModule;
    /**
     * Метод для регистрации модуля с асинхронной конфигурацией.
     *
     * ВАЖНО: crypto optional — если hub.crypto не вернулось, мы CryptoModule не импортируем.
     */
    static forRootAsync(options: PaymentHubModuleAsyncOptions): DynamicModule;
}
