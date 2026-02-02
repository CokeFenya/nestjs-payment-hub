export declare class TbankError extends Error {
    readonly type: string;
    readonly message: string;
    readonly raw?: any;
    constructor(type: string, message: string, raw?: any);
}
