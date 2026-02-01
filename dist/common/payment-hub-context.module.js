"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PaymentHubContextModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHubContextModule = void 0;
// src/common/payment-hub-context.module.ts
const common_1 = require("@nestjs/common");
const interfaces_1 = require("./interfaces");
let PaymentHubContextModule = PaymentHubContextModule_1 = class PaymentHubContextModule {
    static forRoot(options) {
        return {
            module: PaymentHubContextModule_1,
            providers: [
                { provide: interfaces_1.PaymentHubOptionsSymbol, useValue: options }
            ],
            exports: [interfaces_1.PaymentHubOptionsSymbol],
            global: true
        };
    }
    static forRootAsync(options) {
        var _a, _b;
        return {
            module: PaymentHubContextModule_1,
            imports: (_a = options.imports) !== null && _a !== void 0 ? _a : [],
            providers: [
                {
                    provide: interfaces_1.PaymentHubOptionsSymbol,
                    useFactory: options.useFactory,
                    inject: (_b = options.inject) !== null && _b !== void 0 ? _b : []
                }
            ],
            exports: [interfaces_1.PaymentHubOptionsSymbol],
            global: true
        };
    }
};
exports.PaymentHubContextModule = PaymentHubContextModule;
exports.PaymentHubContextModule = PaymentHubContextModule = PaymentHubContextModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], PaymentHubContextModule);
