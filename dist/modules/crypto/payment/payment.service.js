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
exports.CryptoPaymentService = void 0;
const common_1 = require("@nestjs/common");
const crypto_http_client_1 = require("../core/http/crypto.http-client");
let CryptoPaymentService = class CryptoPaymentService {
    constructor(http) {
        this.http = http;
    }
    async createInvoice(data) {
        return this.http.post('/createInvoice', data);
    }
    async getInvoices(params) {
        return this.http.get('/getInvoices', params);
    }
    pickConfirmationUrl(invoice) {
        var _a, _b, _c;
        return ((_c = (_b = (_a = invoice === null || invoice === void 0 ? void 0 : invoice.bot_invoice_url) !== null && _a !== void 0 ? _a : invoice === null || invoice === void 0 ? void 0 : invoice.web_app_invoice_url) !== null && _b !== void 0 ? _b : invoice === null || invoice === void 0 ? void 0 : invoice.mini_app_invoice_url) !== null && _c !== void 0 ? _c : null);
    }
    async verifyInvoicePaid(invoiceId) {
        var _a;
        const res = await this.getInvoices({ invoice_ids: String(invoiceId) });
        const item = (_a = res === null || res === void 0 ? void 0 : res.items) === null || _a === void 0 ? void 0 : _a[0];
        if (!item)
            return null;
        if (item.invoice_id !== invoiceId)
            return null;
        return item.status === 'paid' ? item : null;
    }
};
exports.CryptoPaymentService = CryptoPaymentService;
exports.CryptoPaymentService = CryptoPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crypto_http_client_1.CryptoHttpClient])
], CryptoPaymentService);
