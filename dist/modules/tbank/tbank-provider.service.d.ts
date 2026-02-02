import { TbankCardService } from './card/card.service';
import { TbankFiscalizationService } from './fiscalization/fiscalization.service';
import { TbankSberPayService } from './sberpay/sberpay.service';
import { TbankSbpService } from './sbp';
import { TbankTpayService } from './tpay';
export declare class TbankProviderService {
    readonly card: TbankCardService;
    readonly sbp: TbankSbpService;
    readonly tpay: TbankTpayService;
    readonly sberpay: TbankSberPayService;
    readonly fiscalization: TbankFiscalizationService;
    constructor(card: TbankCardService, sbp: TbankSbpService, tpay: TbankTpayService, sberpay: TbankSberPayService, fiscalization: TbankFiscalizationService);
}
