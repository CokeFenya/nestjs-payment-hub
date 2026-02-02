import { CanActivate, ExecutionContext } from '@nestjs/common';
import { TbankModuleOptions } from '../../../../common/interfaces';
export declare class TbankWebhookGuard implements CanActivate {
    private readonly cfg;
    private readonly logger;
    constructor(cfg: TbankModuleOptions);
    canActivate(context: ExecutionContext): boolean;
    private extractClientIp;
}
