import { SbpQrDataTypeEnum } from '../../enums';
export interface SbpGetQrRequest {
    PaymentId: number;
    DataType?: SbpQrDataTypeEnum;
    BankId?: string;
}
