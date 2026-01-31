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
const common_1 = require("@nestjs/common");
const crypto_module_1 = require("./modules/crypto/crypto.module");
const yookassa_module_1 = require("./modules/yookassa/yookassa.module");
const payment_hub_service_1 = require("./payment-hub.service");
let PaymentHubModule = PaymentHubModule_1 = class PaymentHubModule {
    /**
     * Всегда async.
     * - yookassa обязателен
     * - crypto optional
     */
    static forRootAsync(options) {
        return {
            module: PaymentHubModule_1,
            imports: [
                // YooKassa обязателен
                yookassa_module_1.YookassaModule.forRootAsync({
                    imports: options.imports,
                    inject: options.inject,
                    useFactory: async (...args) => {
                        const hub = await options.useFactory(...args);
                        if (!(hub === null || hub === void 0 ? void 0 : hub.yookassa)) {
                            throw new Error('[PaymentHub] YooKassa config is missing. Provide options.yookassa');
                        }
                        return hub.yookassa;
                    }
                }),
                // Crypto optional (НЕ падаем, если конфига нет)
                crypto_module_1.CryptoModule.forRootAsyncOptional({
                    imports: options.imports,
                    inject: options.inject,
                    useFactory: async (...args) => {
                        const hub = await options.useFactory(...args);
                        return hub === null || hub === void 0 ? void 0 : hub.crypto;
                    }
                })
            ],
            providers: [payment_hub_service_1.PaymentHubService],
            exports: [payment_hub_service_1.PaymentHubService],
            global: true
        };
    }
};
exports.PaymentHubModule = PaymentHubModule;
exports.PaymentHubModule = PaymentHubModule = PaymentHubModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], PaymentHubModule);
