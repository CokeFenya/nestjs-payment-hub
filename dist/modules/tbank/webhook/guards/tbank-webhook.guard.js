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
var TbankWebhookGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankWebhookGuard = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../../../common/interfaces");
const ip_matcher_util_1 = require("../../../../common/utils/ip-matcher.util");
const tbank_token_util_1 = require("../../core/utils/tbank-token.util");
const constants_1 = require("../constants");
let TbankWebhookGuard = TbankWebhookGuard_1 = class TbankWebhookGuard {
    constructor(cfg) {
        this.cfg = cfg;
        this.logger = new common_1.Logger(TbankWebhookGuard_1.name);
    }
    canActivate(context) {
        var _a;
        const req = context.switchToHttp().getRequest();
        const body = (_a = req.body) !== null && _a !== void 0 ? _a : {};
        // 1) IP whitelist
        const clientIp = this.extractClientIp(req);
        if (!(0, ip_matcher_util_1.isIpAllowed)(clientIp, constants_1.TBANK_IP_WHITELIST)) {
            this.logger.warn(`Blocked webhook request from unauthorized IP: ${clientIp}`);
            throw new common_1.ForbiddenException('Webhook request is not from T-Bank');
        }
        // 2) Token verification
        const token = body === null || body === void 0 ? void 0 : body.Token;
        if (!token || typeof token !== 'string') {
            this.logger.warn('Webhook without Token');
            throw new common_1.ForbiddenException('Invalid T-Bank webhook: missing Token');
        }
        // ✅ используем дефолтный игнор ключей из util (Token, Receipt, DATA, Data, Items)
        const expected = (0, tbank_token_util_1.buildTbankToken)(body, this.cfg.password);
        if (expected !== token) {
            this.logger.warn('Webhook Token mismatch');
            throw new common_1.ForbiddenException('Invalid T-Bank webhook: Token mismatch');
        }
        return true;
    }
    extractClientIp(req) {
        var _a;
        const xff = req.headers['x-forwarded-for'];
        if (typeof xff === 'string')
            return xff.split(',')[0].trim();
        return (_a = req.socket.remoteAddress) !== null && _a !== void 0 ? _a : '';
    }
};
exports.TbankWebhookGuard = TbankWebhookGuard;
exports.TbankWebhookGuard = TbankWebhookGuard = TbankWebhookGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.TbankOptionsSymbol)),
    __metadata("design:paramtypes", [Object])
], TbankWebhookGuard);
