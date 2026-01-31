import { type CryptoModuleOptions } from '../../../../common/interfaces/crypto/crypto-options.interface';
export declare class CryptoHttpClient {
    private readonly config;
    private readonly apiBase;
    constructor(config: CryptoModuleOptions);
    request<T = any>(options: {
        method: 'GET' | 'POST';
        path: string;
        data?: any;
        params?: Record<string, any>;
    }): Promise<T>;
    get<T>(path: string, params?: Record<string, any>): Promise<T>;
    post<T>(path: string, data?: any): Promise<T>;
    private buildUrl;
}
