import { TbankModuleOptions } from '../../../common/interfaces';
import { TbankHttpClient } from '../core/http/tbank.http-client';
import { TpayVersionEnum } from './enums';
import type { TpayLinkResponse, TpayStatusResponse } from './interfaces';
export declare class TbankTpayService {
    private readonly http;
    private readonly cfg;
    constructor(http: TbankHttpClient, cfg: TbankModuleOptions);
    status(): Promise<TpayStatusResponse>;
    link(paymentId: number, version?: TpayVersionEnum): Promise<TpayLinkResponse>;
    qr(paymentId: number): Promise<string>;
}
