import { type DynamicModule } from '@nestjs/common';
import { type YookassaModuleAsyncOptions, type YookassaModuleOptions } from '../../common/interfaces';
export declare class YookassaModule {
    static forRoot(options: YookassaModuleOptions): DynamicModule;
    static forRootAsync(options: YookassaModuleAsyncOptions): DynamicModule;
}
