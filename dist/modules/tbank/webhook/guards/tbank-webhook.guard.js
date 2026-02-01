"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankWebhookGuard = void 0;
// src/modules/tbank/webhook/guards/tbank-webhook.guard.ts
const common_1 = require("@nestjs/common");
const tbank_constants_1 = require("../../core/config/tbank.constants");
const tbank_http_client_1 = require("../../core/http/tbank.http-client");
let TbankWebhookGuard = class TbankWebhookGuard {
    constructor(opts) {
        this.opts = opts;
    }
    canActivate(ctx) {
        var _a, _b, _c;
        const req = ctx.switchToHttp().getRequest();
        const body = ((_a = req.body) !== null && _a !== void 0 ? _a : {});
        const received = String((_b = body.Token) !== null && _b !== void 0 ? _b : '');
        if (!received)
            throw new common_1.ForbiddenException('Missing webhook token');
        // Сравниваем подпись
        const expected = (0, tbank_http_client_1.createTbankToken)(body, this.opts.password, [
            'Token',
            'Password'
        ]);
        if (received !== expected)
            throw new common_1.ForbiddenException('Invalid webhook token');
        // Доп. проверка терминала
        if (String((_c = body.TerminalKey) !== null && _c !== void 0 ? _c : '') !== this.opts.terminalKey) {
            throw new common_1.ForbiddenException('Invalid terminal key');
        }
        if (!body.OrderId || !body.PaymentId || !body.Status) {
            throw new common_1.ForbiddenException('Invalid webhook payload');
        }
        return true;
    }
};
exports.TbankWebhookGuard = TbankWebhookGuard;
exports.TbankWebhookGuard = TbankWebhookGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(tbank_constants_1.TbankOptionsSymbol)),
    __metadata("design:paramtypes", [Object])
], TbankWebhookGuard);
