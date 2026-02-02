import type { TbankBaseResponse } from './base.response';
export interface InitResponse extends TbankBaseResponse {
    TerminalKey: string;
    Amount: number;
    OrderId: string;
    PaymentId: string;
    Status: string;
    PaymentURL?: string;
}
