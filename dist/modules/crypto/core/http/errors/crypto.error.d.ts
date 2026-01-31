export declare class CryptoPayError extends Error {
    code: string;
    description: string;
    data?: any;
    constructor(code: string, description: string, data?: any);
}
