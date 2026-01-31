import { CryptoPaymentService } from './payment/payment.service';
export declare class CryptoProviderService {
    readonly payments: CryptoPaymentService;
    constructor(payments: CryptoPaymentService);
}
