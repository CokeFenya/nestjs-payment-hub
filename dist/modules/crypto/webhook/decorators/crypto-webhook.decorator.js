"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoWebhook = CryptoWebhook;
const common_1 = require("@nestjs/common");
const crypto_webhook_guard_1 = require("../guards/crypto-webhook.guard");
function CryptoWebhook() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(crypto_webhook_guard_1.CryptoWebhookGuard));
}
