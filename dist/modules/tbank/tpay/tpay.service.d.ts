import { TbankModuleOptions } from '../../../common/interfaces';
export declare class TbankTpayService {
    private readonly cfg;
    constructor(cfg: TbankModuleOptions);
    private baseUrl;
    getLink(paymentId: number, version?: string): Promise<unknown>;
    getQrSvg(paymentId: number): Promise<string>;
}
