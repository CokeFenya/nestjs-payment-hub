import { YookassaMetadata } from '../../../../common/types/metadata.type';
import { Payment } from '../../payment/interfaces';
import { Refund } from '../../refund/interfaces';
import { NotificationEventEnum, NotificationTypeEnum } from '../enums';
/**
 * Базовый интерфейс уведомления вебхука Юкассы.
 */
export interface BaseNotification<T> {
    /**
     * Тип уведомления.
     */
    type: NotificationTypeEnum;
    /**
     * Тип события.
     */
    event: NotificationEventEnum;
    /**
     * Объект события (платеж, возврат и т.д.).
     */
    object: T;
}
/**
 * Уведомление о платеже.
 */
export interface PaymentNotificationEvent<T extends YookassaMetadata = YookassaMetadata> extends BaseNotification<Payment<T>> {
    event: NotificationEventEnum.PAYMENT_WAITING_FOR_CAPTURE | NotificationEventEnum.PAYMENT_SUCCEEDED | NotificationEventEnum.PAYMENT_CANCELED;
}
/**
 * Уведомление о возврате.
 */
export interface RefundNotificationEvent extends BaseNotification<Refund> {
    event: NotificationEventEnum.REFUND_SUCCEEDED;
}
/**
 * Объединенный тип события вебхука.
 */
export type YookassaNotification<Metadata extends YookassaMetadata = YookassaMetadata> = PaymentNotificationEvent<Metadata> | RefundNotificationEvent;
