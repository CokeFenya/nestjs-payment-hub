// src/modules/crypto/payment/payment.module.ts
import { Module } from '@nestjs/common'
import { CryptoPaymentService } from './payment.service'

@Module({
	providers: [CryptoPaymentService],
	exports: [CryptoPaymentService]
})
export class CryptoPaymentModule {}
