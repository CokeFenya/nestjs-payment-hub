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
const interfaces_1 = require("../../../common/interfaces");
const payment_hub_context_module_1 = require("../../../common/payment-hub-context.module");
const tbank_http_client_1 = require("./http/tbank.http-client");
let TbankCoreModule = class TbankCoreModule {
};
exports.TbankCoreModule = TbankCoreModule;
exports.TbankCoreModule = TbankCoreModule = __decorate([
    (0, common_1.Module)({
        imports: [payment_hub_context_module_1.PaymentHubContextModule],
        providers: [
            {
                provide: interfaces_1.TbankOptionsSymbol,
                useFactory: (hub) => {
                    const cfg = hub.tbank;
                    if (!cfg) {
                        throw new Error('[PaymentHub] T-Bank config is missing. Provide options.tbank');
                    }
                    return cfg;
                },
                inject: [interfaces_1.PaymentHubOptionsSymbol]
            },
            {
                provide: tbank_http_client_1.TbankHttpClient,
                useFactory: (cfg) => new tbank_http_client_1.TbankHttpClient(cfg),
                inject: [interfaces_1.TbankOptionsSymbol]
            }
        ],
        exports: [interfaces_1.TbankOptionsSymbol, tbank_http_client_1.TbankHttpClient]
    })
], TbankCoreModule);
