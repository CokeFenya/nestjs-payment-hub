import { Module } from '@nestjs/common'
import { CryptoProviderService } from './crypto-provider.service'
import { CryptoPaymentModule } from './payment/payment.module'

@Module({
	imports: [CryptoPaymentModule],
	providers: [CryptoProviderService],
	exports: [CryptoProviderService]
})
export class CryptoModule {}
