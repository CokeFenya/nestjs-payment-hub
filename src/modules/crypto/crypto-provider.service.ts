import { Injectable } from '@nestjs/common'
import { CryptoPaymentService } from './payment/payment.service'

@Injectable()
export class CryptoProviderService {
	public constructor(public readonly payments: CryptoPaymentService) {}
}
