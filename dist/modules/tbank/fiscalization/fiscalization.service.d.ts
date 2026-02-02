import { TbankHttpClient } from '../core/http/tbank.http-client';
export declare class TbankFiscalizationService {
    private readonly http;
    constructor(http: TbankHttpClient);
    sendClosingReceipt(data: any): Promise<any>;
}
