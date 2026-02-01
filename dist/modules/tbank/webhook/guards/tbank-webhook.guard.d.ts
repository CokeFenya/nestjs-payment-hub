import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { TbankModuleOptions } from '../../../../common/interfaces/tbank/tbank-options.interface';
export declare class TbankWebhookGuard implements CanActivate {
    private readonly opts;
    constructor(opts: TbankModuleOptions);
    canActivate(ctx: ExecutionContext): boolean;
}
