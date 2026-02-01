"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankError = void 0;
class TbankError extends Error {
    constructor(message, payload) {
        super(message);
        this.payload = payload;
    }
}
exports.TbankError = TbankError;
