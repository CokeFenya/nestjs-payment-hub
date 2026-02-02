/**
 * Уведомление о привязке карты (NotificationAddCard).
 * Поля зависят от сценария и терминала, поэтому оставляем тип гибким.
 */
export interface TbankAddCardNotification {
    TerminalKey: string;
    Success: boolean;
    ErrorCode: string;
    Status?: string;
    CustomerKey?: string;
    CardId?: string;
    Pan?: string;
    ExpDate?: string;
    RebillId?: string;
    Data?: Record<string, any>;
    Token: string;
}
