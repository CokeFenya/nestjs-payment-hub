export declare class TbankError extends Error {
    readonly payload?: unknown;
    constructor(message: string, payload?: unknown);
}
