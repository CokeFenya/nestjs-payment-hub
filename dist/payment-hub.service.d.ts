import { CryptoProviderService } from './modules/crypto/crypto-provider.service';
import { YookassaProviderService } from './modules/yookassa/yookassa-provider.service';
export declare class PaymentHubService {
    readonly yookassa: YookassaProviderService;
    readonly crypto: CryptoProviderService;
    constructor(yookassa: YookassaProviderService, crypto: CryptoProviderService);
}
