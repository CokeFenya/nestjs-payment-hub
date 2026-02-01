// src/modules/yookassa/refund/refund.module.ts
import { Module } from '@nestjs/common'
import { YookassaCoreModule } from '../core/yookassa-core.module'
import { YookassaRefundService } from './refund.service'

@Module({
	imports: [YookassaCoreModule],
	providers: [YookassaRefundService],
	exports: [YookassaRefundService]
})
export class YookassaRefundModule {}
