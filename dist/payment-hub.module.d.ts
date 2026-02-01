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
     *   tbank: {
     *     // пока модуля нет — просто лежит в конфиге
     *   }
     * });
     * ```
     */
    static forRoot(options: PaymentHubModuleOptions): DynamicModule;
    /**
     * Метод для регистрации модуля с асинхронной конфигурацией.
     * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
     * @param {PaymentHubModuleAsyncOptions} options - Асинхронные параметры для конфигурации PaymentHub.
     * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
     *
     * @example
     * ```ts
     * PaymentHubModule.forRootAsync({
     *   imports: [ConfigModule],
     *   inject: [ConfigService],
     *   useFactory: (cfg: ConfigService) => ({
     *     yookassa: {
     *       shopId: cfg.getOrThrow('YOOKASSA_SHOP_ID'),
     *       apiKey: cfg.getOrThrow('YOOKASSA_SECRET_KEY'),
     *       proxyUrl: cfg.get('YOOKASSA_PROXY_URL'),
     *     },
     *     tbank: {
     *       // пока модуля нет — просто лежит в конфиге
     *     },
     *   }),
     * })
     * ```
     */
    static forRootAsync(options: PaymentHubModuleAsyncOptions): DynamicModule;
}
