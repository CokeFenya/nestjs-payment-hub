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
exports.TbankTpayService = void 0;
const common_1 = require("@nestjs/common");
const undici_1 = require("undici");
const interfaces_1 = require("../../../common/interfaces");
const tbank_constants_1 = require("../core/config/tbank.constants");
let TbankTpayService = class TbankTpayService {
    constructor(cfg) {
        this.cfg = cfg;
    }
    baseUrl() {
        return (this.cfg.isTest ? tbank_constants_1.TBANK_API_BASE_URL_TEST : tbank_constants_1.TBANK_API_BASE_URL_PROD).replace(/\/+$/, '');
    }
    async getLink(paymentId, version = '2.0') {
        const url = `${this.baseUrl()}/v2/TinkoffPay/transactions/${paymentId}/versions/${version}/link`;
        const res = await (0, undici_1.request)(url, { method: 'GET' });
        return res.body.json();
    }
    async getQrSvg(paymentId) {
        const url = `${this.baseUrl()}/v2/TinkoffPay/${paymentId}/QR`;
        const res = await (0, undici_1.request)(url, { method: 'GET' });
        // дока: 200 = SVG :contentReference[oaicite:24]{index=24}
        return res.body.text();
    }
};
exports.TbankTpayService = TbankTpayService;
exports.TbankTpayService = TbankTpayService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.TbankOptionsSymbol)),
    __metadata("design:paramtypes", [Object])
], TbankTpayService);
