"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoWebhookUpdateTypeEnum = void 0;
/**
 * Типы апдейтов (вебхуки) Crypto Pay API.
 * Минимально тебе нужен invoice_paid.
 */
var CryptoWebhookUpdateTypeEnum;
(function (CryptoWebhookUpdateTypeEnum) {
    CryptoWebhookUpdateTypeEnum["INVOICE_PAID"] = "invoice_paid";
    CryptoWebhookUpdateTypeEnum["INVOICE_EXPIRED"] = "invoice_expired";
})(CryptoWebhookUpdateTypeEnum || (exports.CryptoWebhookUpdateTypeEnum = CryptoWebhookUpdateTypeEnum = {}));
