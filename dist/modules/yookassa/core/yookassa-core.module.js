"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaCoreModule = void 0;
// src/modules/yookassa/core/yookassa-core.module.ts
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../../common/interfaces");
const yookassa_http_client_1 = require("./http/yookassa.http-client");
let YookassaCoreModule = class YookassaCoreModule {
};
exports.YookassaCoreModule = YookassaCoreModule;
exports.YookassaCoreModule = YookassaCoreModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: interfaces_1.YookassaOptionsSymbol,
                useFactory: (hub) => {
                    const cfg = hub.yookassa;
                    if (!cfg) {
                        throw new Error('[PaymentHub] YooKassa config is missing. Provide options.yookassa');
                    }
                    return cfg;
                },
                inject: [interfaces_1.PaymentHubOptionsSymbol]
            },
            {
                provide: yookassa_http_client_1.YookassaHttpClient,
                useFactory: (cfg) => new yookassa_http_client_1.YookassaHttpClient(cfg),
                inject: [interfaces_1.YookassaOptionsSymbol]
            }
        ],
        exports: [interfaces_1.YookassaOptionsSymbol, yookassa_http_client_1.YookassaHttpClient]
    })
], YookassaCoreModule);
