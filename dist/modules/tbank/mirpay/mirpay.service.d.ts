import { TbankHttpClient } from '../core/http/tbank.http-client';
export declare class TbankMirPayService {
    private readonly http;
    constructor(http: TbankHttpClient);
    getDeepLink(PaymentId: string): Promise<any>;
}
