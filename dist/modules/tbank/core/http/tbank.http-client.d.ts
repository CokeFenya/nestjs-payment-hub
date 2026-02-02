import { TbankModuleOptions } from '../../../../common/interfaces';
export declare class TbankHttpClient {
    private readonly cfg;
    private readonly dispatcher;
    private readonly baseUrl;
    constructor(cfg: TbankModuleOptions);
    post<T = any>(path: string, data: Record<string, any>): Promise<T>;
}
