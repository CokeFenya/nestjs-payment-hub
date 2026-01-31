import { Injectable, Optional } from '@nestjs/common'
import { CryptoProviderService } from './modules/crypto/crypto-provider.service'
import { YookassaProviderService } from './modules/yookassa/yookassa-provider.service'

@Injectable()
export class PaymentHubService {
	public constructor(
		@Optional() public readonly yookassa?: YookassaProviderService,
		@Optional() public readonly crypto?: CryptoProviderService
	) {}
}
