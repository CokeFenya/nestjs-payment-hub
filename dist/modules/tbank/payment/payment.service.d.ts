import { TbankHttpClient } from '../core/http/tbank.http-client';
import type { TbankGetStateRequest, TbankGetStateResponse, TbankInitRequest, TbankInitResponse } from './interfaces';
export declare class TbankPaymentService {
    private readonly http;
    constructor(http: TbankHttpClient);
    init(data: TbankInitRequest): Promise<TbankInitResponse>;
    getState(data: TbankGetStateRequest): Promise<TbankGetStateResponse>;
}
