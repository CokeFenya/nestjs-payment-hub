export interface CancelRequest {
    PaymentId: string;
    Amount?: number;
    IP?: string;
    Receipt?: any;
}
