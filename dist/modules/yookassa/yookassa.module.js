"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var YookassaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaModule = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../common/interfaces");
const yookassa_http_client_1 = require("./core/http/yookassa.http-client");
const invoice_module_1 = require("./invoice/invoice.module");
const payment_method_module_1 = require("./payment-method/payment-method.module");
const payment_module_1 = require("./payment/payment.module");
const refund_module_1 = require("./refund/refund.module");
const yookassa_provider_service_1 = require("./yookassa-provider.service");
let YookassaModule = YookassaModule_1 = class YookassaModule {
    static forRoot(options) {
        return {
            module: YookassaModule_1,
            imports: [
                payment_module_1.YookassaPaymentModule,
                refund_module_1.YookassaRefundModule,
                invoice_module_1.YookassaInvoiceModule,
                payment_method_module_1.YookassaPaymentMethodModule
            ],
            providers: [
                { provide: interfaces_1.YookassaOptionsSymbol, useValue: options },
                {
                    provide: yookassa_http_client_1.YookassaHttpClient,
                    useFactory: (cfg) => new yookassa_http_client_1.YookassaHttpClient(cfg),
                    inject: [interfaces_1.YookassaOptionsSymbol]
                },
                yookassa_provider_service_1.YookassaProviderService
            ],
            exports: [yookassa_provider_service_1.YookassaProviderService, yookassa_http_client_1.YookassaHttpClient]
        };
    }
    static forRootAsync(options) {
        var _a;
        const asyncOptionsProvider = {
            provide: interfaces_1.YookassaOptionsSymbol,
            useFactory: options.useFactory,
            // TS иногда ругается на readonly — приводим
            inject: ((_a = options.inject) !== null && _a !== void 0 ? _a : [])
        };
        return {
            module: YookassaModule_1,
            imports: [
                ...(options.imports || []),
                payment_module_1.YookassaPaymentModule,
                refund_module_1.YookassaRefundModule,
                invoice_module_1.YookassaInvoiceModule,
                payment_method_module_1.YookassaPaymentMethodModule
            ],
            providers: [
                asyncOptionsProvider,
                {
                    provide: yookassa_http_client_1.YookassaHttpClient,
                    useFactory: (cfg) => new yookassa_http_client_1.YookassaHttpClient(cfg),
                    inject: [interfaces_1.YookassaOptionsSymbol]
                },
                yookassa_provider_service_1.YookassaProviderService
            ],
            exports: [yookassa_provider_service_1.YookassaProviderService, yookassa_http_client_1.YookassaHttpClient]
        };
    }
};
exports.YookassaModule = YookassaModule;
exports.YookassaModule = YookassaModule = YookassaModule_1 = __decorate([
    (0, common_1.Module)({})
], YookassaModule);
