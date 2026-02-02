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
const interfaces_1 = require("../../../common/interfaces");
const tbank_http_client_1 = require("../core/http/tbank.http-client");
const enums_1 = require("./enums");
let TbankTpayService = class TbankTpayService {
    constructor(http, cfg) {
        this.http = http;
        this.cfg = cfg;
    }
    // GET /v2/TinkoffPay/terminals/{TerminalKey}/status (Bearer) :contentReference[oaicite:5]{index=5}
    status() {
        return this.http.getBearer(`v2/TinkoffPay/terminals/${encodeURIComponent(this.cfg.terminalKey)}/status`);
    }
    // GET /v2/TinkoffPay/transactions/{paymentId}/versions/{version}/link (Bearer) :contentReference[oaicite:6]{index=6}
    link(paymentId, version = enums_1.TpayVersionEnum.V2_0) {
        return this.http.getBearer(`v2/TinkoffPay/transactions/${encodeURIComponent(String(paymentId))}/versions/${encodeURIComponent(version)}/link`);
    }
    // GET /v2/TinkoffPay/{paymentId}/QR (Bearer, image/svg) :contentReference[oaicite:7]{index=7}
    qr(paymentId) {
        return this.http.getBearer(`v2/TinkoffPay/${encodeURIComponent(String(paymentId))}/QR`);
    }
};
exports.TbankTpayService = TbankTpayService;
exports.TbankTpayService = TbankTpayService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(interfaces_1.TbankOptionsSymbol)),
    __metadata("design:paramtypes", [tbank_http_client_1.TbankHttpClient, Object])
], TbankTpayService);
