import { TbankMirPayService } from './mirpay/mirpay.service';
import { TbankPaymentService } from './payment/payment.service';
import { TbankSbpService } from './sbp/sbp.service';
import { TbankTpayService } from './tpay/tpay.service';
export declare class TbankProviderService {
    readonly payments: TbankPaymentService;
    readonly sbp: TbankSbpService;
    readonly tpay: TbankTpayService;
    readonly mirpay: TbankMirPayService;
    constructor(payments: TbankPaymentService, sbp: TbankSbpService, tpay: TbankTpayService, mirpay: TbankMirPayService);
}
