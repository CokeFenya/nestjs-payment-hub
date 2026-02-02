export interface TpayStatusResponse {
    Success?: boolean;
    ErrorCode?: string;
    Message?: string;
    Details?: string;
    TerminalKey?: string;
    Status?: string;
    [k: string]: any;
}
