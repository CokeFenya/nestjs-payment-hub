import type { CryptoPayInvoice } from '../../payment/interfaces';
import { CryptoPayWebhookUpdateTypeEnum } from '../enums/update-type.enum';
export interface CryptoPayWebhookUpdate {
    update_id: number;
    update_type: CryptoPayWebhookUpdateTypeEnum;
    request_date: string;
    payload: CryptoPayInvoice;
}
