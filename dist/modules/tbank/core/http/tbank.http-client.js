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
const common_1 = require("@nestjs/common");
const undici_1 = require("undici");
const interfaces_1 = require("../../../../common/interfaces");
const tbank_constants_1 = require("../config/tbank.constants");
const tbank_token_util_1 = require("../utils/tbank-token.util");
const tbank_error_1 = require("./errors/tbank.error");
let TbankHttpClient = class TbankHttpClient {
    constructor(cfg) {
        this.cfg = cfg;
        this.baseUrl = (cfg.isTest ? tbank_constants_1.TBANK_API_BASE_URL_TEST : tbank_constants_1.TBANK_API_BASE_URL_PROD).replace(/\/+$/, '');
        // ✅ ВАЖНО: если proxyUrl не задан — всё равно ставим Agent(),
        // чтобы перебить setGlobalDispatcher(ProxyAgent)
        this.dispatcher = cfg.proxyUrl
            ? new undici_1.ProxyAgent(cfg.proxyUrl)
            : new undici_1.Agent();
    }
    async post(path, data) {
        var _a, _b;
        const url = `${this.baseUrl}/${tbank_constants_1.TBANK_API_VERSION}/${path.replace(/^\/+/, '')}`;
        const body = Object.assign(Object.assign({}, data), { TerminalKey: (_a = data.TerminalKey) !== null && _a !== void 0 ? _a : this.cfg.terminalKey });
        body.Token = (0, tbank_token_util_1.buildTbankToken)(body, this.cfg.password);
        const res = await (0, undici_1.request)(url, {
            method: 'POST',
            dispatcher: this.dispatcher, // ✅ всегда задан
            headersTimeout: 15000,
            bodyTimeout: 15000,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'User-Agent': 'mcstarbound-backend/1.0'
            },
            body: JSON.stringify(body)
        });
        // дальше как у тебя...
        const text = await res.body.text();
        // ✅ если пришёл HTML — логируем текст
        try {
            const json = JSON.parse(text);
            if (res.statusCode >= 400) {
                throw new tbank_error_1.TbankError('tbank_http_error', `HTTP ${res.statusCode}`, json);
            }
            if (json &&
                typeof json === 'object' &&
                'Success' in json &&
                json.Success === false) {
                throw new tbank_error_1.TbankError('tbank_api_error', (_b = json.Message) !== null && _b !== void 0 ? _b : 'T-Bank API error', json);
            }
            return json;
        }
        catch (_c) {
            throw new tbank_error_1.TbankError('tbank_non_json_response', `Non-JSON response (HTTP ${res.statusCode})`, {
                url,
                statusCode: res.statusCode,
                responseHead: text.slice(0, 500),
                bodySent: body
            });
        }
    }
};
exports.TbankHttpClient = TbankHttpClient;
exports.TbankHttpClient = TbankHttpClient = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.TbankOptionsSymbol)),
    __metadata("design:paramtypes", [Object])
], TbankHttpClient);
