import { TbankHttpClient } from '../core/http/tbank.http-client';
import { GetQrStateRequest } from './interfaces/requests/get-qr-state.request';
import { GetQrRequest } from './interfaces/requests/get-qr.request';
import { GetQrStateResponse } from './interfaces/responses/get-qr-state.response';
import { GetQrResponse } from './interfaces/responses/get-qr.response';
export declare class TbankSbpService {
    private readonly http;
    constructor(http: TbankHttpClient);
    getQr(data: GetQrRequest): Promise<GetQrResponse>;
    getQrState(data: GetQrStateRequest): Promise<GetQrStateResponse>;
}
