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
exports.TbankCardService = void 0;
const common_1 = require("@nestjs/common");
const tbank_http_client_1 = require("../core/http/tbank.http-client");
let TbankCardService = class TbankCardService {
    constructor(http) {
        this.http = http;
    }
    init(data) {
        return this.http.postSigned('Init', data);
    }
    finishAuthorize(data) {
        return this.http.postSigned('FinishAuthorize', data);
    }
    confirm(data) {
        return this.http.postSigned('Confirm', data);
    }
    cancel(data) {
        return this.http.postSigned('Cancel', data);
    }
    getState(data) {
        return this.http.postSigned('GetState', data);
    }
};
exports.TbankCardService = TbankCardService;
exports.TbankCardService = TbankCardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tbank_http_client_1.TbankHttpClient])
], TbankCardService);
