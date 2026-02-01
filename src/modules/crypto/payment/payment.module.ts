import { Module } from '@nestjs/common'
import { CryptoCoreModule } from '../core/crypto-core.module'
import { CryptoPaymentService } from './payment.service'

@Module({
	imports: [CryptoCoreModule],
	providers: [CryptoPaymentService],
	exports: [CryptoPaymentService]
})
export class CryptoPaymentModule {}
