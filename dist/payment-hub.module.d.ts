import { type DynamicModule } from '@nestjs/common';
import type { PaymentHubModuleAsyncOptions } from './common/interfaces';
export declare class PaymentHubModule {
    /**
     * Всегда async.
     * - yookassa обязателен
     * - crypto optional
     */
    static forRootAsync(options: PaymentHubModuleAsyncOptions): DynamicModule;
}
