import { CryptoPayModuleOptions } from '../../../../common/interfaces';
export declare class CryptoPayHttpClient {
    private readonly baseUrl;
    private readonly token;
    constructor(cfg: CryptoPayModuleOptions);
    get<T>(method: string, params?: Record<string, any>): Promise<T>;
    post<T>(method: string, body?: Record<string, any>): Promise<T>;
}
