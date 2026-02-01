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
const payment_hub_context_module_1 = require("./common/payment-hub-context.module");
const crypto_1 = require("./modules/crypto");
const tbank_1 = require("./modules/tbank"); // ✅ ДОБАВЬ
const yookassa_module_1 = require("./modules/yookassa/yookassa.module");
const payment_hub_service_1 = require("./payment-hub.service");
let PaymentHubModule = PaymentHubModule_1 = class PaymentHubModule {
    static forRoot(options) {
        return {
            module: PaymentHubModule_1,
            imports: [
                payment_hub_context_module_1.PaymentHubContextModule.forRoot(options),
                yookassa_module_1.YookassaModule,
                crypto_1.CryptoModule,
                tbank_1.TbankModule
            ],
            providers: [payment_hub_service_1.PaymentHubService],
            exports: [payment_hub_service_1.PaymentHubService],
            global: true
        };
    }
    static forRootAsync(options) {
        return {
            module: PaymentHubModule_1,
            imports: [
                payment_hub_context_module_1.PaymentHubContextModule.forRootAsync(options),
                yookassa_module_1.YookassaModule,
                crypto_1.CryptoModule,
                tbank_1.TbankModule
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
