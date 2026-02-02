import { CryptoProviderService } from './modules/crypto/crypto-provider.service';
import { TbankProviderService } from './modules/tbank/tbank-provider.service';
import { YookassaProviderService } from './modules/yookassa/yookassa-provider.service';
export declare class PaymentHubService {
    readonly yookassa: YookassaProviderService;
    readonly crypto: CryptoProviderService;
    readonly tbank: TbankProviderService;
    constructor(yookassa: YookassaProviderService, crypto: CryptoProviderService, tbank: TbankProviderService);
}
