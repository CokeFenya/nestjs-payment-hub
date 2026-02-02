import type { TbankPaymentStatusEnum } from '../../payment/enums';
/**
 * Уведомление о платеже (NotificationPayment).
 * Набор полей может отличаться по статусам/сценариям, поэтому многое optional.
 */
export interface TbankPaymentNotification {
    TerminalKey: string;
    OrderId?: string;
    Success: boolean;
    Status?: TbankPaymentStatusEnum | string;
    PaymentId: string;
    ErrorCode: string;
    Amount?: number;
    CardId?: string;
    Pan?: string;
    ExpDate?: string;
    RebillId?: string;
    Data?: Record<string, any>;
    Receipt?: any;
    Token: string;
}
