// =====================================
// src/payment-hub.service.ts
// =====================================
import { Injectable } from '@nestjs/common'
import { YookassaProviderService } from './modules/yookassa/yookassa-provider.service'

@Injectable()
export class PaymentHubService {
	public constructor(public readonly yookassa: YookassaProviderService) {}
}
