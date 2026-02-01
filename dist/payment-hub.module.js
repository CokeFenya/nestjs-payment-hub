"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaymentHubModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHubModule = void 0;
// src/payment-hub.module.ts
const common_1 = require("@nestjs/common");
const interfaces_1 = require("./common/interfaces");
const yookassa_http_client_1 = require("./modules/yookassa/core/http/yookassa.http-client");
const invoice_module_1 = require("./modules/yookassa/invoice/invoice.module");
const payment_method_service_1 = require("./modules/yookassa/payment-method/payment-method.service");
const payment_module_1 = require("./modules/yookassa/payment/payment.module");
const refund_module_1 = require("./modules/yookassa/refund/refund.module");
const yookassa_provider_service_1 = require("./modules/yookassa/yookassa-provider.service");
const yookassa_module_1 = require("./modules/yookassa/yookassa.module");
const payment_hub_service_1 = require("./payment-hub.service");
let PaymentHubModule = PaymentHubModule_1 = class PaymentHubModule {
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
    static forRoot(options) {
        return {
            module: PaymentHubModule_1,
            imports: [
                // Пока подключаем только YooKassa-домены
                payment_module_1.YookassaPaymentModule,
                refund_module_1.YookassaRefundModule,
                invoice_module_1.YookassaInvoiceModule,
                payment_method_service_1.YookassaPaymentMethodService,
                // Агрегирующий модуль провайдера YooKassa
                yookassa_module_1.YookassaModule
            ],
            providers: [
                // 1) Кладём весь hub-config в DI (yookassa/tbank/...)
                { provide: interfaces_1.PaymentHubOptionsSymbol, useValue: options },
                // 2) Достаём yookassa-config и прокидываем в "родной" токен YooKassa
                {
                    provide: interfaces_1.YookassaOptionsSymbol,
                    useFactory: (hub) => {
                        const cfg = hub.yookassa;
                        if (!cfg) {
                            throw new Error('[PaymentHub] YooKassa config is missing. Provide options.yookassa');
                        }
                        return cfg;
                    },
                    inject: [interfaces_1.PaymentHubOptionsSymbol]
                },
                // 3) Создаём YooKassa client как раньше
                {
                    provide: yookassa_http_client_1.YookassaHttpClient,
                    useFactory: (cfg) => new yookassa_http_client_1.YookassaHttpClient(cfg),
                    inject: [interfaces_1.YookassaOptionsSymbol]
                },
                // 4) Хаб, который прокидывает доступ к провайдерам (hub.yookassa)
                payment_hub_service_1.PaymentHubService
            ],
            exports: [
                payment_hub_service_1.PaymentHubService,
                yookassa_http_client_1.YookassaHttpClient,
                // Экспортируем провайдера YooKassa наружу при необходимости
                yookassa_provider_service_1.YookassaProviderService
            ],
            global: true
        };
    }
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
    static forRootAsync(options) {
        var _a;
        return {
            module: PaymentHubModule_1,
            imports: [
                ...(options.imports || []),
                // Пока подключаем только YooKassa-домены
                payment_module_1.YookassaPaymentModule,
                refund_module_1.YookassaRefundModule,
                invoice_module_1.YookassaInvoiceModule,
                payment_method_service_1.YookassaPaymentMethodService,
                // Агрегирующий модуль провайдера YooKassa
                yookassa_module_1.YookassaModule
            ],
            providers: [
                // 1) Асинхронно получаем весь hub-config в DI (yookassa/tbank/...)
                {
                    provide: interfaces_1.PaymentHubOptionsSymbol,
                    useFactory: options.useFactory,
                    inject: (_a = options.inject) !== null && _a !== void 0 ? _a : []
                },
                // 2) Достаём yookassa-config и прокидываем в "родной" токен YooKassa
                {
                    provide: interfaces_1.YookassaOptionsSymbol,
                    useFactory: (hub) => {
                        const cfg = hub.yookassa;
                        if (!cfg) {
                            throw new Error('[PaymentHub] YooKassa config is missing. Provide options.yookassa');
                        }
                        return cfg;
                    },
                    inject: [interfaces_1.PaymentHubOptionsSymbol]
                },
                // 3) Создаём YooKassa client как раньше
                {
                    provide: yookassa_http_client_1.YookassaHttpClient,
                    useFactory: (cfg) => new yookassa_http_client_1.YookassaHttpClient(cfg),
                    inject: [interfaces_1.YookassaOptionsSymbol]
                },
                // 4) Хаб, который прокидывает доступ к провайдерам (hub.yookassa)
                payment_hub_service_1.PaymentHubService
            ],
            exports: [
                payment_hub_service_1.PaymentHubService,
                yookassa_http_client_1.YookassaHttpClient,
                // Экспортируем провайдера YooKassa наружу при необходимости
                yookassa_provider_service_1.YookassaProviderService
            ],
            global: true
        };
    }
};
exports.PaymentHubModule = PaymentHubModule;
exports.PaymentHubModule = PaymentHubModule = PaymentHubModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], PaymentHubModule);
