"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TBANK_DEFAULTS = exports.TbankOptionsSymbol = void 0;
// src/modules/tbank/core/config/tbank.constants.ts
exports.TbankOptionsSymbol = Symbol.for('nestjs-payment-hub:TbankOptions');
exports.TBANK_DEFAULTS = {
    baseUrl: 'https://securepay.tinkoff.ru',
    timeoutMs: 15000
};
