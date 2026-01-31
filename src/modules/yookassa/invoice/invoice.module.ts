import { Module } from '@nestjs/common'
import { YookassaInvoiceService } from './invoice.service'

@Module({
	providers: [YookassaInvoiceService],
	exports: [YookassaInvoiceService]
})
export class YookassaInvoiceModule {}
