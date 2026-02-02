export interface GetQrResponse {
    Success: boolean;
    ErrorCode: string;
    Message?: string;
    Details?: string;
    PaymentId?: number;
    Data?: string;
}
