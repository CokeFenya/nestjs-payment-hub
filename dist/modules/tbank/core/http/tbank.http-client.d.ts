import { TbankModuleOptions } from '../../../../common/interfaces';
export declare class TbankHttpClient {
    private readonly cfg;
    private readonly dispatcher;
    private readonly baseUrl;
    constructor(cfg: TbankModuleOptions);
    /** Классические методы эквайринга: /v2/Init, /v2/GetState и т.п. (Token = sha256) */
    postSigned<T = any>(path: string, data: Record<string, any>): Promise<T>;
    /** Bearer GET для T-Pay/SberPay */
    getBearerText(path: string, headers?: Record<string, string>): Promise<string>;
    /** Bearer GET, ожидаем JSON (link/status и т.п.) */
    getBearer<T = any>(path: string, headers?: Record<string, string>): Promise<T>;
    /** Bearer POST для cashbox/SendClosingReceipt */
    postBearer<T = any>(path: string, data: Record<string, any>): Promise<T>;
    private doJsonRequest;
}
