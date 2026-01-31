"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoWebhookUpdateTypeEnum = void 0;
/**
 * Типы апдейтов (вебхуки) Crypto Pay API.
 * Сейчас в доке гарантированно указан invoice_paid.
 */
var CryptoWebhookUpdateTypeEnum;
(function (CryptoWebhookUpdateTypeEnum) {
    CryptoWebhookUpdateTypeEnum["INVOICE_PAID"] = "invoice_paid";
    // иногда встречается invoice_expired, но в доке в секции webhook явно указан invoice_paid
})(CryptoWebhookUpdateTypeEnum || (exports.CryptoWebhookUpdateTypeEnum = CryptoWebhookUpdateTypeEnum = {}));
