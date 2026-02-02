import { TbankHttpClient } from '../core/http/tbank.http-client';
import type { CancelRequest, ConfirmRequest, FinishAuthorizeRequest, GetStateRequest, GetStateResponse, InitRequest, InitResponse } from './interfaces';
export declare class TbankPaymentService {
    private readonly http;
    constructor(http: TbankHttpClient);
    init(data: InitRequest): Promise<InitResponse>;
    finishAuthorize(data: FinishAuthorizeRequest): Promise<any>;
    confirm(data: ConfirmRequest): Promise<any>;
    cancel(data: CancelRequest): Promise<any>;
    getState(data: GetStateRequest): Promise<GetStateResponse>;
}
