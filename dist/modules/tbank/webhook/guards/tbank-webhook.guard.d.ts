import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { TbankOptions } from '../../../../common/interfaces/tbank/tbank-options.interface';
export declare class TbankWebhookGuard implements CanActivate {
    private readonly opts;
    constructor(opts: TbankOptions);
    canActivate(ctx: ExecutionContext): boolean;
}
