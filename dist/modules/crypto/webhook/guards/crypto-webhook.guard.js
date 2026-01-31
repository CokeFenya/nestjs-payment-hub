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
exports.CryptoWebhookGuard = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const crypto_options_interface_1 = require("../../../../common/interfaces/crypto/crypto-options.interface");
let CryptoWebhookGuard = class CryptoWebhookGuard {
    constructor(cfg) {
        this.cfg = cfg;
    }
    canActivate(ctx) {
        var _a, _b;
        const req = ctx
            .switchToHttp()
            .getRequest();
        const signature = (_a = req.headers['crypto-pay-api-signature']) === null || _a === void 0 ? void 0 : _a.trim();
        if (!signature)
            throw new common_1.ForbiddenException('Missing crypto signature');
        const raw = (_b = req.rawBody) !== null && _b !== void 0 ? _b : '';
        if (!raw)
            throw new common_1.ForbiddenException('Missing rawBody');
        const secret = (0, crypto_1.createHash)('sha256').update(this.cfg.apiToken).digest();
        const hmac = (0, crypto_1.createHmac)('sha256', secret).update(raw).digest('hex');
        if (hmac !== signature)
            throw new common_1.ForbiddenException('Invalid crypto signature');
        return true;
    }
};
exports.CryptoWebhookGuard = CryptoWebhookGuard;
exports.CryptoWebhookGuard = CryptoWebhookGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(crypto_options_interface_1.CryptoOptionsSymbol)),
    __metadata("design:paramtypes", [Object])
], CryptoWebhookGuard);
