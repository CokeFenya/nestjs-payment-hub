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
exports.TbankHttpClient = void 0;
// core/http/tbank.http-client.ts
const common_1 = require("@nestjs/common");
const undici_1 = require("undici");
const interfaces_1 = require("../../../../common/interfaces");
const tbank_constants_1 = require("../config/tbank.constants");
const tbank_token_util_1 = require("../utils/tbank-token.util");
const tbank_error_1 = require("./errors/tbank.error");
function isTbankApiErrorShape(x) {
    return !!x && typeof x === 'object' && 'Success' in x;
}
let TbankHttpClient = class TbankHttpClient {
    constructor(cfg) {
        this.cfg = cfg;
        this.baseUrl = tbank_constants_1.TBANK_API_BASE_URL.replace(/\/+$/, '');
        this.dispatcher = cfg.proxyUrl
            ? new undici_1.ProxyAgent(cfg.proxyUrl)
            : new undici_1.Agent();
    }
    /** Классические методы эквайринга: /v2/Init, /v2/GetState и т.п. (Token = sha256) */
    async postSigned(path, data) {
        var _a;
        const url = `${this.baseUrl}/${tbank_constants_1.TBANK_API_VERSION}/${path.replace(/^\/+/, '')}`;
        const body = Object.assign(Object.assign({}, data), { TerminalKey: (_a = data.TerminalKey) !== null && _a !== void 0 ? _a : this.cfg.terminalKey });
        body.Token = (0, tbank_token_util_1.buildTbankToken)(body, this.cfg.password);
        return this.doJsonRequest(url, 'POST', body, {
            'Content-Type': 'application/json'
        });
    }
    /** Bearer GET для T-Pay/SberPay */
    async getBearerText(path, headers) {
        const url = `${this.baseUrl}/${path.replace(/^\/+/, '')}`;
        const res = await (0, undici_1.request)(url, {
            method: 'GET',
            dispatcher: this.dispatcher,
            headersTimeout: 15000,
            bodyTimeout: 15000,
            headers: Object.assign({ Authorization: `Bearer ${this.cfg.bearerToken}` }, (headers !== null && headers !== void 0 ? headers : {}))
        });
        const text = await res.body.text();
        if (res.statusCode >= 400) {
            throw new tbank_error_1.TbankError('tbank_http_error', `HTTP ${res.statusCode}`, {
                url,
                responseHead: text.slice(0, 4000)
            });
        }
        return text;
    }
    /** Bearer GET, ожидаем JSON (link/status и т.п.) */
    async getBearer(path, headers) {
        const url = `${this.baseUrl}/${path.replace(/^\/+/, '')}`;
        return this.doJsonRequest(url, 'GET', undefined, Object.assign({ Authorization: `Bearer ${this.cfg.bearerToken}` }, (headers !== null && headers !== void 0 ? headers : {})));
    }
    /** Bearer POST для cashbox/SendClosingReceipt */
    async postBearer(path, data) {
        const url = `${this.baseUrl}/${path.replace(/^\/+/, '')}`;
        return this.doJsonRequest(url, 'POST', data, {
            Authorization: `Bearer ${this.cfg.bearerToken}`,
            'Content-Type': 'application/json'
        });
    }
    async doJsonRequest(url, method, body, headers) {
        var _a, _b, _c;
        try {
            const res = await (0, undici_1.request)(url, {
                method,
                dispatcher: this.dispatcher,
                headersTimeout: 15000,
                bodyTimeout: 15000,
                headers,
                body: body === undefined ? undefined : JSON.stringify(body)
            });
            const text = await res.body.text();
            let json;
            try {
                json = text ? JSON.parse(text) : {};
            }
            catch (_d) {
                throw new tbank_error_1.TbankError('tbank_non_json_response', `Non-JSON response (HTTP ${res.statusCode})`, {
                    url,
                    statusCode: res.statusCode,
                    responseHead: text.slice(0, 4000)
                });
            }
            if (res.statusCode >= 400) {
                throw new tbank_error_1.TbankError('tbank_http_error', `HTTP ${res.statusCode}`, json);
            }
            // В классическом API часто есть Success=false — проверяем универсально
            if (isTbankApiErrorShape(json) && json.Success === false) {
                throw new tbank_error_1.TbankError('tbank_api_error', (_a = json.Message) !== null && _a !== void 0 ? _a : 'T-Bank API error', json);
            }
            return json;
        }
        catch (e) {
            if (e instanceof tbank_error_1.TbankError)
                throw e;
            throw new tbank_error_1.TbankError((_b = e === null || e === void 0 ? void 0 : e.type) !== null && _b !== void 0 ? _b : 'tbank_error', (_c = e === null || e === void 0 ? void 0 : e.message) !== null && _c !== void 0 ? _c : 'Unknown T-Bank error', e);
        }
    }
};
exports.TbankHttpClient = TbankHttpClient;
exports.TbankHttpClient = TbankHttpClient = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.TbankOptionsSymbol)),
    __metadata("design:paramtypes", [Object])
], TbankHttpClient);
