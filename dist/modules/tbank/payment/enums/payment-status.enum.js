"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankPaymentStatusEnum = void 0;
var TbankPaymentStatusEnum;
(function (TbankPaymentStatusEnum) {
    TbankPaymentStatusEnum["NEW"] = "NEW";
    TbankPaymentStatusEnum["FORM_SHOWED"] = "FORM_SHOWED";
    TbankPaymentStatusEnum["DEADLINE_EXPIRED"] = "DEADLINE_EXPIRED";
    TbankPaymentStatusEnum["PREAUTHORIZING"] = "PREAUTHORIZING";
    TbankPaymentStatusEnum["AUTHORIZED"] = "AUTHORIZED";
    TbankPaymentStatusEnum["AUTH_FAIL"] = "AUTH_FAIL";
    TbankPaymentStatusEnum["CONFIRMED"] = "CONFIRMED";
    TbankPaymentStatusEnum["CANCELED"] = "CANCELED";
    TbankPaymentStatusEnum["REJECTED"] = "REJECTED";
    // если будешь трогать возвраты/реверсы позже
    TbankPaymentStatusEnum["REFUNDED"] = "REFUNDED";
    TbankPaymentStatusEnum["PARTIAL_REFUNDED"] = "PARTIAL_REFUNDED";
    TbankPaymentStatusEnum["REVERSED"] = "REVERSED";
    TbankPaymentStatusEnum["PARTIAL_REVERSED"] = "PARTIAL_REVERSED";
})(TbankPaymentStatusEnum || (exports.TbankPaymentStatusEnum = TbankPaymentStatusEnum = {}));
