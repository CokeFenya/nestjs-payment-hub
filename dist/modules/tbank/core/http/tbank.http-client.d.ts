import type { TbankModuleOptions } from '../../../../common/interfaces';
export declare const TBANK_DEFAULTS: {
    readonly baseUrl: "https://securepay.tinkoff.ru";
    readonly timeoutMs: 15000;
};
export declare function createTbankToken(root: Record<string, unknown>, password: string, excludeKeys?: readonly string[]): string;
export declare class TbankHttpClient {
    private readonly http;
    private readonly terminalKey;
    private readonly password;
    constructor(options: TbankModuleOptions);
    post<TResponse, TBody extends object>(path: string, body: TBody): Promise<TResponse>;
    get<TResponse>(path: string, params?: Record<string, unknown>): Promise<TResponse>;
    private sign;
}
