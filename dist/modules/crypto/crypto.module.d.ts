import { type DynamicModule } from '@nestjs/common';
import { type CryptoModuleAsyncOptions, type CryptoModuleOptions } from '../../common/interfaces/crypto/crypto-options.interface';
export declare class CryptoModule {
    static forRoot(options: CryptoModuleOptions): DynamicModule;
    static forRootAsync(options: CryptoModuleAsyncOptions): DynamicModule;
}
