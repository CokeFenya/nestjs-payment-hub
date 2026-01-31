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
let CryptoModule = CryptoModule_1 = class CryptoModule {
    static forRoot(options) {
        return {
            module: CryptoModule_1,
            imports: [payment_module_1.CryptoPaymentModule],
            providers: [
                { provide: crypto_options_interface_1.CryptoOptionsSymbol, useValue: options },
                crypto_http_client_1.CryptoHttpClient,
                crypto_provider_service_1.CryptoProviderService
            ],
            exports: [crypto_provider_service_1.CryptoProviderService, crypto_http_client_1.CryptoHttpClient]
        };
    }
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
                crypto_provider_service_1.CryptoProviderService
            ],
            exports: [crypto_provider_service_1.CryptoProviderService, crypto_http_client_1.CryptoHttpClient]
        };
    }
};
exports.CryptoModule = CryptoModule;
exports.CryptoModule = CryptoModule = CryptoModule_1 = __decorate([
    (0, common_1.Module)({})
], CryptoModule);
