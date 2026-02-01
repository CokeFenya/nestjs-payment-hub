import { type DynamicModule } from '@nestjs/common';
import type { PaymentHubModuleAsyncOptions, PaymentHubModuleOptions } from './interfaces';
export declare class PaymentHubContextModule {
    static forRoot(options: PaymentHubModuleOptions): DynamicModule;
    static forRootAsync(options: PaymentHubModuleAsyncOptions): DynamicModule;
}
