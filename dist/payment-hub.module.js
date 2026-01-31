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
const crypto_options_interface_1 = require("./common/interfaces/crypto/crypto-options.interface");
const crypto_http_client_1 = require("./modules/crypto/core/http/crypto.http-client");
const crypto_module_1 = require("./modules/crypto/crypto.module");
const yookassa_http_client_1 = require("./modules/yookassa/core/http/yookassa.http-client");
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
     *   crypto: {
     *     apiToken: 'token',
     *     testnet: true,
     *   }
     * });
     * ```
     */
    static forRoot(options) {
        const hasCrypto = Boolean(options.crypto);
        return {
            module: PaymentHubModule_1,
            imports: [
                // Подключаем провайдера YooKassa целиком
                yookassa_module_1.YookassaModule,
                // Crypto подключаем только если он реально сконфигурирован
                ...(hasCrypto ? [crypto_module_1.CryptoModule] : [])
            ],
            providers: [
                // 1) Кладём весь hub-config в DI (yookassa/crypto/tbank/...)
                { provide: interfaces_1.PaymentHubOptionsSymbol, useValue: options },
                // ===== YooKassa как было =====
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
                {
                    provide: yookassa_http_client_1.YookassaHttpClient,
                    useFactory: (cfg) => new yookassa_http_client_1.YookassaHttpClient(cfg),
                    inject: [interfaces_1.YookassaOptionsSymbol]
                },
                // ===== Crypto (optional) =====
                ...(hasCrypto
                    ? [
                        {
                            provide: crypto_options_interface_1.CryptoOptionsSymbol,
                            useFactory: (hub) => hub.crypto,
                            inject: [interfaces_1.PaymentHubOptionsSymbol]
                        },
                        {
                            provide: crypto_http_client_1.CryptoHttpClient,
                            useFactory: (cfg) => new crypto_http_client_1.CryptoHttpClient(cfg),
                            inject: [crypto_options_interface_1.CryptoOptionsSymbol]
                        }
                    ]
                    : []),
                // 4) Хаб, который прокидывает доступ к провайдерам (hub.yookassa / hub.crypto)
                payment_hub_service_1.PaymentHubService
            ],
            exports: [
                payment_hub_service_1.PaymentHubService,
                // наружу по желанию
                yookassa_http_client_1.YookassaHttpClient,
                ...(hasCrypto ? [crypto_http_client_1.CryptoHttpClient] : []),
                yookassa_provider_service_1.YookassaProviderService
            ],
            global: true
        };
    }
    /**
     * Метод для регистрации модуля с асинхронной конфигурацией.
     * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
     */
    static forRootAsync(options) {
        // В async-режиме мы НЕ знаем заранее, есть crypto или нет (оно придёт из useFactory),
        // поэтому: импортируем CryptoModule всегда, но провайдеры crypto делаем "мягкими"
        // (НЕ throw), и НЕ создаём CryptoHttpClient если cfg нет.
        //
        // ВАЖНО: чтобы это работало, CryptoModule не должен требовать CryptoHttpClient на старте.
        // Сейчас у тебя CryptoPaymentService использует CryptoHttpClient -> значит CryptoHttpClient должен существовать,
        // если CryptoModule импортирован. Поэтому в async лучше делать импорт CryptoModule условным через отдельный "wrapper".
        //
        // Но чтобы НЕ ЛОМАТЬ, сделаем проще:
        // 1) CryptoModule импортируем ВСЕГДА
        // 2) CryptoHttpClient создаём, только если cfg есть
        // 3) А в PaymentHubService ты ставишь @Optional() crypto?: CryptoProviderService
        //
        // Это сработает, если CryptoProviderService / CryptoPaymentService НЕ будут инстанцироваться без CryptoHttpClient.
        // Если будут — тогда нужно условно импортировать CryptoModule (чуть сложнее, скажешь — сделаю).
        var _a;
        return {
            module: PaymentHubModule_1,
            imports: [
                ...(options.imports || []),
                // Подключаем провайдера YooKassa целиком
                yookassa_module_1.YookassaModule,
                // CryptoModule подключаем (см. комментарий выше)
                crypto_module_1.CryptoModule
            ],
            providers: [
                // 1) Асинхронно получаем весь hub-config в DI (yookassa/crypto/tbank/...)
                {
                    provide: interfaces_1.PaymentHubOptionsSymbol,
                    useFactory: options.useFactory,
                    inject: (_a = options.inject) !== null && _a !== void 0 ? _a : []
                },
                // ===== YooKassa как было =====
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
                {
                    provide: yookassa_http_client_1.YookassaHttpClient,
                    useFactory: (cfg) => new yookassa_http_client_1.YookassaHttpClient(cfg),
                    inject: [interfaces_1.YookassaOptionsSymbol]
                },
                // ===== Crypto (optional) =====
                {
                    provide: crypto_options_interface_1.CryptoOptionsSymbol,
                    useFactory: (hub) => hub.crypto,
                    inject: [interfaces_1.PaymentHubOptionsSymbol]
                },
                {
                    provide: crypto_http_client_1.CryptoHttpClient,
                    useFactory: (cfg) => {
                        // НЕ throw: чтобы можно было стартовать без crypto
                        if (!cfg)
                            return undefined;
                        return new crypto_http_client_1.CryptoHttpClient(cfg);
                    },
                    inject: [crypto_options_interface_1.CryptoOptionsSymbol]
                },
                payment_hub_service_1.PaymentHubService
            ],
            exports: [
                payment_hub_service_1.PaymentHubService,
                yookassa_http_client_1.YookassaHttpClient,
                crypto_http_client_1.CryptoHttpClient,
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
