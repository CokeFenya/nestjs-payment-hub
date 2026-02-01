import { TbankPaymentService } from './payment/payment.service';
export declare class TbankProviderService {
    readonly payments: TbankPaymentService;
    constructor(payments: TbankPaymentService);
}
