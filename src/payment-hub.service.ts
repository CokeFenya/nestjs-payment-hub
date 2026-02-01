import { Injectable } from '@nestjs/common'
import { CryptoProviderService } from './modules/crypto/crypto-provider.service'
import { YookassaProviderService } from './modules/yookassa/yookassa-provider.service'

@Injectable()
export class PaymentHubService {
	public constructor(
		public readonly yookassa: YookassaProviderService,
		public readonly crypto: CryptoProviderService
	) {}
}
