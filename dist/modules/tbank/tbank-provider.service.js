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
exports.TbankProviderService = void 0;
const common_1 = require("@nestjs/common");
const mirpay_service_1 = require("./mirpay/mirpay.service");
const payment_service_1 = require("./payment/payment.service");
const sbp_service_1 = require("./sbp/sbp.service");
const tpay_service_1 = require("./tpay/tpay.service");
let TbankProviderService = class TbankProviderService {
    constructor(payments, sbp, tpay, mirpay) {
        this.payments = payments;
        this.sbp = sbp;
        this.tpay = tpay;
        this.mirpay = mirpay;
    }
};
exports.TbankProviderService = TbankProviderService;
exports.TbankProviderService = TbankProviderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payment_service_1.TbankPaymentService,
        sbp_service_1.TbankSbpService,
        tpay_service_1.TbankTpayService,
        mirpay_service_1.TbankMirPayService])
], TbankProviderService);
