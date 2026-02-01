// ✅ FIX: make PaymentHubOptionsSymbol visible inside YookassaCoreModule
// Approach: create a tiny global context module that exports PaymentHubOptionsSymbol,
// import it in PaymentHubModule + YookassaCoreModule.

// ======================================================
// 1) NEW FILE: src/common/payment-hub-context.module.ts
// ======================================================
import { Global, Module } from '@nestjs/common'
import { PaymentHubOptionsSymbol } from './interfaces'

@Global()
@Module({
	// PaymentHubOptionsSymbol provider is registered in PaymentHubModule.forRoot/forRootAsync,
	// but exporting the token from a global module makes it visible to core modules.
	exports: [PaymentHubOptionsSymbol]
})
export class PaymentHubContextModule {}
