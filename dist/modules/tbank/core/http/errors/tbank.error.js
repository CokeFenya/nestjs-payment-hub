"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankError = void 0;
class TbankError extends Error {
    constructor(type, message, raw) {
        super(message);
        this.type = type;
        this.message = message;
        this.raw = raw;
    }
}
exports.TbankError = TbankError;
