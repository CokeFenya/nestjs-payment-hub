"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoHttpClient = void 0;
// src/modules/crypto/core/http/crypto.http-client.ts
const common_1 = require("@nestjs/common");
const undici_1 = require("undici");
const crypto_options_interface_1 = require("../../../../common/interfaces/crypto/crypto-options.interface");
const crypto_constants_1 = require("../config/crypto.constants");
const crypto_error_1 = require("./errors/crypto.error");
function isCryptoFail(x) {
    return x.ok === false;
}
let CryptoHttpClient = class CryptoHttpClient {
    constructor(config) {
        this.config = config;
        this.apiBase = (0, crypto_constants_1.resolveCryptoApiUrl)(config);
    }
    async request(options) {
        const url = this.buildUrl(options.path, options.params);
        try {
            const res = await (0, undici_1.request)(url, {
                method: options.method,
                headersTimeout: 15000,
                bodyTimeout: 15000,
                headers: {
                    'Content-Type': 'application/json',
                    'Crypto-Pay-API-Token': this.config.apiToken
                },
                body: options.data ? JSON.stringify(options.data) : undefined
            });
            const text = await res.body.text();
            if (res.statusCode >= 400) {
                throw new crypto_error_1.CryptoPayError('http_error', `HTTP ${res.statusCode}`, {
                    statusCode: res.statusCode,
                    raw: text
                });
            }
            let payload;
            try {
                payload = JSON.parse(text);
            }
            catch (_a) {
                throw new crypto_error_1.CryptoPayError('invalid_json', text, {
                    statusCode: res.statusCode,
                    raw: text
                });
            }
            if (isCryptoFail(payload)) {
                throw new crypto_error_1.CryptoPayError(payload.error, payload.error, {
                    statusCode: res.statusCode,
                    raw: text
                });
            }
            return payload.result;
        }
        catch (error) {
            if (error instanceof crypto_error_1.CryptoPayError)
                throw error;
            throw new crypto_error_1.CryptoPayError((error === null || error === void 0 ? void 0 : error.type) || 'crypto_pay_error', (error === null || error === void 0 ? void 0 : error.message) || 'Unknown Crypto Pay error', error);
        }
    }
    get(path, params) {
        return this.request({ method: 'GET', path, params });
    }
    post(path, data) {
        return this.request({ method: 'POST', path, data });
    }
    buildUrl(path, params) {
        const p = path.startsWith('/') ? path : `/${path}`;
        let full = `${this.apiBase}${p}`;
        if (params && typeof params === 'object') {
            const qp = new URLSearchParams();
            for (const [k, v] of Object.entries(params)) {
                if (v === undefined || v === null)
                    continue;
                qp.set(k, String(v));
            }
            const qs = qp.toString();
            if (qs)
                full += `?${qs}`;
        }
        return full;
    }
};
exports.CryptoHttpClient = CryptoHttpClient;
exports.CryptoHttpClient = CryptoHttpClient = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(crypto_options_interface_1.CryptoOptionsSymbol)),
    __metadata("design:paramtypes", [Object])
], CryptoHttpClient);
