"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaModule = void 0;
// =====================================
// 4) UPDATE: src/modules/yookassa/yookassa.module.ts
// (ensure core module is pulled in)
// =====================================
const common_1 = require("@nestjs/common");
const yookassa_core_module_1 = require("./core/yookassa-core.module");
const invoice_module_1 = require("./invoice/invoice.module");
const payment_method_module_1 = require("./payment-method/payment-method.module");
const payment_module_1 = require("./payment/payment.module");
const refund_module_1 = require("./refund/refund.module");
const yookassa_provider_service_1 = require("./yookassa-provider.service");
let YookassaModule = class YookassaModule {
};
exports.YookassaModule = YookassaModule;
exports.YookassaModule = YookassaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            yookassa_core_module_1.YookassaCoreModule,
            payment_module_1.YookassaPaymentModule,
            refund_module_1.YookassaRefundModule,
            invoice_module_1.YookassaInvoiceModule,
            payment_method_module_1.YookassaPaymentMethodModule
        ],
        providers: [yookassa_provider_service_1.YookassaProviderService],
        exports: [yookassa_provider_service_1.YookassaProviderService]
    })
], YookassaModule);
