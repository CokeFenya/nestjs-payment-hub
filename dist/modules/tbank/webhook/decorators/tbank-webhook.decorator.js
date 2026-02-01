"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankWebhook = TbankWebhook;
const common_1 = require("@nestjs/common");
const tbank_webhook_guard_1 = require("../guards/tbank-webhook.guard");
function TbankWebhook() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(tbank_webhook_guard_1.TbankWebhookGuard));
}
