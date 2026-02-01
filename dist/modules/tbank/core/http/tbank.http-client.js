"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankHttpClient = void 0;
exports.createTbankToken = createTbankToken;
const axios_1 = require("axios");
const crypto_1 = require("crypto");
const tbank_constants_1 = require("../config/tbank.constants");
const tbank_error_1 = require("./errors/tbank.error");
function isPlainObject(v) {
    return typeof v === 'object' && v !== null && !Array.isArray(v);
}
function createTbankToken(root, password, excludeKeys = ['Token', 'Password']) {
    const pairs = [];
    for (const [k, v] of Object.entries(root)) {
        if (excludeKeys.includes(k))
            continue;
        if (isPlainObject(v) || Array.isArray(v))
            continue;
        const pv = v;
        if (pv === undefined)
            continue;
        pairs.push([k, String(pv)]);
    }
    pairs.push(['Password', password]);
    pairs.sort(([a], [b]) => a.localeCompare(b));
    const concatenated = pairs.map(([, v]) => v).join('');
    return (0, crypto_1.createHash)('sha256').update(concatenated, 'utf8').digest('hex');
}
class TbankHttpClient {
    constructor(options) {
        var _a, _b;
        this.options = options;
        const baseUrl = (_a = options.baseUrl) !== null && _a !== void 0 ? _a : tbank_constants_1.TBANK_DEFAULTS.baseUrl;
        const timeout = (_b = options.timeoutMs) !== null && _b !== void 0 ? _b : tbank_constants_1.TBANK_DEFAULTS.timeoutMs;
        this.terminalKey = options.terminalKey;
        this.password = options.password;
        this.http = axios_1.default.create({
            baseURL: baseUrl,
            timeout,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    async post(path, body) {
        var _a, _b;
        const signed = this.sign(body);
        const { data } = await this.http.post(path, signed);
        if (isPlainObject(data) && data.Success === false) {
            throw new tbank_error_1.TbankError(String((_b = (_a = data.Message) !== null && _a !== void 0 ? _a : data.Details) !== null && _b !== void 0 ? _b : 'T-Bank API error'), data);
        }
        return data;
    }
    async get(path, params) {
        const { data } = await this.http.get(path, { params });
        return data;
    }
    sign(body) {
        const merged = Object.assign({}, body);
        if (!merged.TerminalKey)
            merged.TerminalKey = this.terminalKey;
        if (!merged.Token)
            merged.Token = createTbankToken(merged, this.password);
        return merged;
    }
}
exports.TbankHttpClient = TbankHttpClient;
