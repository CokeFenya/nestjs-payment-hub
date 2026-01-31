"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CryptoModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoModule = void 0;
const common_1 = require("@nestjs/common");
const crypto_options_interface_1 = require("../../common/interfaces/crypto/crypto-options.interface");
const crypto_http_client_1 = require("./core/http/crypto.http-client");
const crypto_provider_service_1 = require("./crypto-provider.service");
const payment_module_1 = require("./payment/payment.module");
const payment_service_1 = require("./payment/payment.service");
let CryptoModule = CryptoModule_1 = class CryptoModule {
    /**
     * Обычный async (если хочешь crypto всегда обязателен)
     */
    static forRootAsync(options) {
        var _a;
        const asyncOptionsProvider = {
            provide: crypto_options_interface_1.CryptoOptionsSymbol,
            useFactory: options.useFactory,
            inject: ((_a = options.inject) !== null && _a !== void 0 ? _a : [])
        };
        return {
            module: CryptoModule_1,
            imports: [...(options.imports || []), payment_module_1.CryptoPaymentModule],
            providers: [
                asyncOptionsProvider,
                crypto_http_client_1.CryptoHttpClient,
                payment_service_1.CryptoPaymentService,
                crypto_provider_service_1.CryptoProviderService
            ],
            exports: [crypto_provider_service_1.CryptoProviderService, crypto_http_client_1.CryptoHttpClient]
        };
    }
    /**
     * Optional async (для PaymentHub): если crypto конфига нет — провайдеров "как бы нет"
     */
    static forRootAsyncOptional(options) {
        var _a;
        // 1) options (может быть undefined)
        const asyncOptionsProvider = {
            provide: crypto_options_interface_1.CryptoOptionsSymbol,
            useFactory: options.useFactory,
            inject: ((_a = options.inject) !== null && _a !== void 0 ? _a : [])
        };
        // 2) http client (может быть undefined)
        const httpProvider = {
            provide: crypto_http_client_1.CryptoHttpClient,
            useFactory: (cfg) => {
                if (!cfg)
                    return undefined;
                // CryptoHttpClient у тебя сейчас принимает config через @Inject(CryptoOptionsSymbol),
                // но мы создаём руками — значит убери @Inject внутри конструктора И принимай cfg параметром,
                // ЛИБО оставь как есть и делай "new CryptoHttpClient(cfg as any)".
                return new crypto_http_client_1.CryptoHttpClient(cfg);
            },
            inject: [crypto_options_interface_1.CryptoOptionsSymbol]
        };
        // 3) payment service (может быть undefined)
        const paymentProvider = {
            provide: payment_service_1.CryptoPaymentService,
            useFactory: (http) => {
                if (!http)
                    return undefined;
                return new payment_service_1.CryptoPaymentService(http);
            },
            inject: [crypto_http_client_1.CryptoHttpClient]
        };
        // 4) provider service (может быть undefined)
        const providerProvider = {
            provide: crypto_provider_service_1.CryptoProviderService,
            useFactory: (payments) => {
                if (!payments)
                    return undefined;
                return new crypto_provider_service_1.CryptoProviderService(payments);
            },
            inject: [payment_service_1.CryptoPaymentService]
        };
        return {
            module: CryptoModule_1,
            imports: [...(options.imports || []), payment_module_1.CryptoPaymentModule],
            providers: [
                asyncOptionsProvider,
                httpProvider,
                paymentProvider,
                providerProvider
            ],
            exports: [crypto_provider_service_1.CryptoProviderService, crypto_http_client_1.CryptoHttpClient]
        };
    }
};
exports.CryptoModule = CryptoModule;
exports.CryptoModule = CryptoModule = CryptoModule_1 = __decorate([
    (0, common_1.Module)({})
], CryptoModule);
