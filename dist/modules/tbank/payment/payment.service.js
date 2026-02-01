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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TbankPaymentService = void 0;
const common_1 = require("@nestjs/common");
const tbank_http_client_1 = require("../core/http/tbank.http-client");
let TbankPaymentService = class TbankPaymentService {
    constructor(http) {
        this.http = http;
    }
    /** Создание платежа (редирект на PaymentURL) */
    init(data) {
        return this.http.post('/v2/Init', data);
    }
    /** Проверка статуса */
    getState(data) {
        return this.http.post('/v2/GetState', data);
    }
    // ===== SBP =====
    sbpGetQr(data) {
        return this.http.post('/v2/GetQr', data);
    }
    // ===== T-Pay =====
    tPayQr(paymentId) {
        // возвращает SVG строкой
        return this.http.get(`/v2/TinkoffPay/${paymentId}/QR`);
    }
    tPayLink(params) {
        const { paymentId, version } = params;
        return this.http.get(`/v2/TinkoffPay/transactions/${paymentId}/versions/${version}/link`);
    }
    // ===== SberPay =====
    sberPayLink(params) {
        const { paymentId } = params;
        return this.http.get(`/v2/SberPay/transactions/${paymentId}/link`);
    }
    // ===== MirPay =====
    mirPayDeepLink(data) {
        return this.http.post('/v2/MirPay/GetDeepLink', data);
    }
};
exports.TbankPaymentService = TbankPaymentService;
exports.TbankPaymentService = TbankPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tbank_http_client_1.TbankHttpClient])
], TbankPaymentService);
