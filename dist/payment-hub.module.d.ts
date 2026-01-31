import { type DynamicModule } from '@nestjs/common';
import type { PaymentHubModuleAsyncOptions, PaymentHubModuleOptions } from './common/interfaces';
export declare class PaymentHubModule {
    /**
     * Метод для регистрации модуля с синхронными параметрами.
     * Этот метод используется для конфигурации модуля с заранее заданными параметрами.
     * @param {PaymentHubModuleOptions} options - Настройки для конфигурации PaymentHub.
     * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
     *
     * @example
     * ```ts
     * PaymentHubModule.forRoot({
     *   yookassa: {
     *     shopId: 'your_shop_id',
     *     apiKey: 'your_api_key',
     *   },
     *   crypto: {
     *     apiToken: 'token',
     *     testnet: true,
     *   }
     * });
     * ```
     */
    static forRoot(options: PaymentHubModuleOptions): DynamicModule;
    /**
     * Метод для регистрации модуля с асинхронной конфигурацией.
     * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
     */
    static forRootAsync(options: PaymentHubModuleAsyncOptions): DynamicModule;
}
