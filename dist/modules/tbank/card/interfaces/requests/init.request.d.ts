import type { PayTypeEnum, TbankLanguageEnum } from '../../enums';
export interface InitRequest {
    Amount: number;
    OrderId: string;
    Description?: string;
    PayType?: PayTypeEnum;
    Language?: TbankLanguageEnum;
    NotificationURL?: string;
    SuccessURL?: string;
    FailURL?: string;
    RedirectDueDate?: string;
    CustomerKey?: string;
    Recurrent?: 'Y';
    DATA?: Record<string, string>;
    Receipt?: any;
}
