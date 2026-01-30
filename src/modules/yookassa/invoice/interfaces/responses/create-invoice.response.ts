import type { YookassaMetadata } from '../../../../../common/types/metadata.type'
import type { Invoice } from './invoice.response'

export interface CreateInvoiceResponse<
	T extends YookassaMetadata = YookassaMetadata
> extends Invoice<T> {}
