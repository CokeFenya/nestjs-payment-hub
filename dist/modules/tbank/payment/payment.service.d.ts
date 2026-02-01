import { TbankHttpClient } from '../core/http/tbank.http-client';
import type { TbankGetStateRequest, TbankInitRequest, TbankMirPayDeepLinkRequest, TbankSberPayLinkParams, TbankSbpGetQrRequest, TbankTPayLinkParams } from './interfaces/requests';
import type { TbankGetStateResponse, TbankInitResponse, TbankMirPayDeepLinkResponse, TbankSberPayLinkResponse, TbankSbpGetQrResponse, TbankTPayLinkResponse } from './interfaces/responses';
export declare class TbankPaymentService {
    private readonly http;
    constructor(http: TbankHttpClient);
    /** Создание платежа (редирект на PaymentURL) */
    init(data: TbankInitRequest): Promise<TbankInitResponse>;
    /** Проверка статуса */
    getState(data: TbankGetStateRequest): Promise<TbankGetStateResponse>;
    sbpGetQr(data: TbankSbpGetQrRequest): Promise<TbankSbpGetQrResponse>;
    tPayQr(paymentId: number): Promise<string>;
    tPayLink(params: TbankTPayLinkParams): Promise<TbankTPayLinkResponse>;
    sberPayLink(params: TbankSberPayLinkParams): Promise<TbankSberPayLinkResponse>;
    mirPayDeepLink(data: TbankMirPayDeepLinkRequest): Promise<TbankMirPayDeepLinkResponse>;
}
