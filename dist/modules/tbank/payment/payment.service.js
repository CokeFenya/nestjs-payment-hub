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
    init(data) {
        return this.http.post('Init', data); // /v2/Init :contentReference[oaicite:12]{index=12}
    }
    finishAuthorize(data) {
        return this.http.post('FinishAuthorize', data); // /v2/FinishAuthorize :contentReference[oaicite:13]{index=13}
    }
    confirm(data) {
        return this.http.post('Confirm', data); // /v2/Confirm :contentReference[oaicite:14]{index=14}
    }
    cancel(data) {
        return this.http.post('Cancel', data); // /v2/Cancel :contentReference[oaicite:15]{index=15}
    }
    getState(data) {
        return this.http.post('GetState', data); // /v2/GetState :contentReference[oaicite:16]{index=16}
    }
};
exports.TbankPaymentService = TbankPaymentService;
exports.TbankPaymentService = TbankPaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tbank_http_client_1.TbankHttpClient])
], TbankPaymentService);
