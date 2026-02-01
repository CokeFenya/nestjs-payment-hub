"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPayHttpClient = void 0;
class CryptoPayHttpClient {
    constructor(cfg) {
        this.token = cfg.token;
        this.baseUrl = cfg.testnet
            ? 'https://testnet-pay.crypt.bot'
            : 'https://pay.crypt.bot';
    }
    async get(method, params) {
        const url = new URL(`/api/${method}`, this.baseUrl);
        if (params) {
            for (const [k, v] of Object.entries(params)) {
                if (v === undefined || v === null)
                    continue;
                url.searchParams.set(k, String(v));
            }
        }
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Crypto-Pay-API-Token': this.token
            }
        });
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`[CryptoPay] GET ${method} failed: ${res.status} ${text}`);
        }
        return (await res.json());
    }
    async post(method, body) {
        const url = new URL(`/api/${method}`, this.baseUrl);
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Crypto-Pay-API-Token': this.token,
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
        });
        if (!res.ok) {
            const text = await res.text().catch(() => '');
            throw new Error(`[CryptoPay] POST ${method} failed: ${res.status} ${text}`);
        }
        return (await res.json());
    }
}
exports.CryptoPayHttpClient = CryptoPayHttpClient;
