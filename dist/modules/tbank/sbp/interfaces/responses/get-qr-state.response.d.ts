export interface GetQrStateResponse {
    Success: boolean;
    ErrorCode: string;
    Message?: string;
    Details?: string;
    PaymentId?: string;
    Status?: string;
}
