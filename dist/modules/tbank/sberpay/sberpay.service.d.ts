import { TbankHttpClient } from '../core/http/tbank.http-client';
import type { SberPayLinkResponse } from './interfaces';
export declare class TbankSberPayService {
    private readonly http;
    constructor(http: TbankHttpClient);
    link(paymentId: number): Promise<SberPayLinkResponse>;
    qr(paymentId: number): Promise<string>;
}
