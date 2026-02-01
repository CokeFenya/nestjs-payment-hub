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
// =====================================
// 2) UPDATE: src/payment-hub.module.ts
// =====================================
const common_1 = require("@nestjs/common");
const interfaces_1 = require("./common/interfaces");
const payment_hub_context_module_1 = require("./common/payment-hub-context.module");
const yookassa_module_1 = require("./modules/yookassa/yookassa.module");
const payment_hub_service_1 = require("./payment-hub.service");
let PaymentHubModule = PaymentHubModule_1 = class PaymentHubModule {
    static forRoot(options) {
        return {
            module: PaymentHubModule_1,
            imports: [
                payment_hub_context_module_1.PaymentHubContextModule, // ✅ important
                yookassa_module_1.YookassaModule
            ],
            providers: [
                { provide: interfaces_1.PaymentHubOptionsSymbol, useValue: options },
                payment_hub_service_1.PaymentHubService
            ],
            exports: [
                payment_hub_service_1.PaymentHubService,
                interfaces_1.PaymentHubOptionsSymbol // ✅ export token too
            ],
            global: true
        };
    }
    static forRootAsync(options) {
        var _a;
        return {
            module: PaymentHubModule_1,
            imports: [
                payment_hub_context_module_1.PaymentHubContextModule, // ✅ important
                ...(options.imports || []),
                yookassa_module_1.YookassaModule
            ],
            providers: [
                {
                    provide: interfaces_1.PaymentHubOptionsSymbol,
                    useFactory: options.useFactory,
                    inject: (_a = options.inject) !== null && _a !== void 0 ? _a : []
                },
                payment_hub_service_1.PaymentHubService
            ],
            exports: [payment_hub_service_1.PaymentHubService, interfaces_1.PaymentHubOptionsSymbol],
            global: true
        };
    }
};
exports.PaymentHubModule = PaymentHubModule;
exports.PaymentHubModule = PaymentHubModule = PaymentHubModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], PaymentHubModule);
