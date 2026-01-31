import { CanActivate, ExecutionContext } from '@nestjs/common';
import { type CryptoModuleOptions } from '../../../../common/interfaces/crypto/crypto-options.interface';
export declare class CryptoWebhookGuard implements CanActivate {
    private readonly cfg;
    constructor(cfg: CryptoModuleOptions);
    canActivate(ctx: ExecutionContext): boolean;
}
