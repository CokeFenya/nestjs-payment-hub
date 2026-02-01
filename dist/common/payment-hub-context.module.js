"use strict";
// ✅ FIX: make PaymentHubOptionsSymbol visible inside YookassaCoreModule
// Approach: create a tiny global context module that exports PaymentHubOptionsSymbol,
// import it in PaymentHubModule + YookassaCoreModule.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHubContextModule = void 0;
// ======================================================
// 1) NEW FILE: src/common/payment-hub-context.module.ts
// ======================================================
const common_1 = require("@nestjs/common");
const interfaces_1 = require("./interfaces");
let PaymentHubContextModule = class PaymentHubContextModule {
};
exports.PaymentHubContextModule = PaymentHubContextModule;
exports.PaymentHubContextModule = PaymentHubContextModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        // PaymentHubOptionsSymbol provider is registered in PaymentHubModule.forRoot/forRootAsync,
        // but exporting the token from a global module makes it visible to core modules.
        exports: [interfaces_1.PaymentHubOptionsSymbol]
    })
], PaymentHubContextModule);
