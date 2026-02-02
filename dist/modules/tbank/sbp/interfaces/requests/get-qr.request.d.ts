import { SbpDataTypeEnum } from '../../enums/sbp-data-type.enum';
export interface GetQrRequest {
    PaymentId: number;
    DataType?: SbpDataTypeEnum;
    BankId?: string;
}
