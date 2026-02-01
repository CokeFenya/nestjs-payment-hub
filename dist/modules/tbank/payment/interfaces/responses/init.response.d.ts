import type { TbankPaymentStatusEnum } from '../../enums';
import type { TbankCommonResponse } from './common.response';
export interface TbankInitResponse extends TbankCommonResponse {
    PaymentId?: string;
    OrderId?: string;
    Amount?: number;
    Status?: TbankPaymentStatusEnum | string;
    PaymentURL?: string;
}
