"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankCoreModule = void 0;
const common_1 = require("@nestjs/common");
const payment_hub_options_interface_1 = require("../../../common/interfaces/payment-hub-options.interface");
const payment_hub_context_module_1 = require("../../../common/payment-hub-context.module"); // ✅ ДОБАВЬ
const tbank_constants_1 = require("./config/tbank.constants");
const tbank_http_client_1 = require("./http/tbank.http-client");
let TbankCoreModule = class TbankCoreModule {
};
exports.TbankCoreModule = TbankCoreModule;
exports.TbankCoreModule = TbankCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [payment_hub_context_module_1.PaymentHubContextModule], // ✅ ВОТ ЭТО ГЛАВНОЕ
        providers: [
            {
                provide: tbank_constants_1.TBANK_OPTIONS,
                useFactory: (opts) => {
                    if (!opts.tbank) {
                        throw new Error('Tbank options are missing. Provide { tbank: { terminalKey, password } } in PaymentHubModule.forRoot(...)');
                    }
                    return opts.tbank;
                },
                inject: [payment_hub_options_interface_1.PaymentHubOptionsSymbol]
            },
            tbank_http_client_1.TbankHttpClient
        ],
        exports: [tbank_constants_1.TBANK_OPTIONS, tbank_http_client_1.TbankHttpClient] // ✅ лучше экспортить и options тоже
    })
], TbankCoreModule);
