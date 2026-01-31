"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPayError = void 0;
// src/modules/crypto/core/http/errors/crypto.error.ts
class CryptoPayError extends Error {
    constructor(code, description, data) {
        super(description);
        this.code = code;
        this.description = description;
        this.data = data;
        this.name = 'CryptoPayError';
    }
}
exports.CryptoPayError = CryptoPayError;
