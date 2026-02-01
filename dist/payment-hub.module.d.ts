import { type DynamicModule } from '@nestjs/common';
import type { PaymentHubModuleAsyncOptions, PaymentHubModuleOptions } from './common/interfaces';
export declare class PaymentHubModule {
    static forRoot(options: PaymentHubModuleOptions): DynamicModule;
    static forRootAsync(options: PaymentHubModuleAsyncOptions): DynamicModule;
}
