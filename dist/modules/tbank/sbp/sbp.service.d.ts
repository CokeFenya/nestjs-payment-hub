import { TbankHttpClient } from '../core/http/tbank.http-client';
import type { SbpGetQrRequest, SbpGetQrResponse } from './interfaces';
export declare class TbankSbpService {
    private readonly http;
    constructor(http: TbankHttpClient);
    getQr(data: SbpGetQrRequest): Promise<SbpGetQrResponse>;
}
