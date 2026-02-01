"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaPaymentModule = void 0;
// src/modules/yookassa/payment/payment.module.ts
const common_1 = require("@nestjs/common");
const yookassa_core_module_1 = require("../core/yookassa-core.module");
const payment_service_1 = require("./payment.service");
let YookassaPaymentModule = class YookassaPaymentModule {
};
exports.YookassaPaymentModule = YookassaPaymentModule;
exports.YookassaPaymentModule = YookassaPaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [yookassa_core_module_1.YookassaCoreModule],
        providers: [payment_service_1.YookassaPaymentService],
        exports: [payment_service_1.YookassaPaymentService]
    })
], YookassaPaymentModule);
