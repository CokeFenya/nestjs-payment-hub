"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankNotificationKindEnum = void 0;
/**
 * Тип входящего уведомления (внутренний enum для удобства роутинга).
 * В теле нотификаций T-Bank отдельного поля "type" может не быть,
 * поэтому определяем вид по набору полей.
 */
var TbankNotificationKindEnum;
(function (TbankNotificationKindEnum) {
    TbankNotificationKindEnum["PAYMENT"] = "payment";
    TbankNotificationKindEnum["ADD_CARD"] = "add_card";
    TbankNotificationKindEnum["QR"] = "qr";
    TbankNotificationKindEnum["UNKNOWN"] = "unknown";
})(TbankNotificationKindEnum || (exports.TbankNotificationKindEnum = TbankNotificationKindEnum = {}));
