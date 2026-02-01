// src/modules/yookassa/invoice/invoice.module.ts
import { Module } from '@nestjs/common'
import { YookassaCoreModule } from '../core/yookassa-core.module'
import { YookassaInvoiceService } from './invoice.service'

@Module({
	imports: [YookassaCoreModule],
	providers: [YookassaInvoiceService],
	exports: [YookassaInvoiceService]
})
export class YookassaInvoiceModule {}
