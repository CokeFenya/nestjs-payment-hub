import type { TbankBaseResponse } from './base.response';
export interface GetStateResponse extends TbankBaseResponse {
    TerminalKey: string;
    PaymentId: string;
    OrderId?: string;
    Status?: string;
    Amount?: number;
}
