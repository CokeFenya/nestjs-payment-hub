/**
 * Уведомление о статусе привязки счета по QR (NotificationQr).
 * В доке отмечено, что приходят статусы ACTIVE/INACTIVE. :contentReference[oaicite:2]{index=2}
 */
export interface TbankQrNotification {
    TerminalKey: string;
    Success: boolean;
    ErrorCode: string;
    Status?: 'ACTIVE' | 'INACTIVE' | string;
    QrId?: string;
    AccountId?: string;
    CustomerKey?: string;
    Data?: Record<string, any>;
    Token: string;
}
