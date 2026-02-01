import { Injectable } from '@nestjs/common'
import { TbankPaymentService } from './payment/payment.service'

@Injectable()
export class TbankProviderService {
	public constructor(public readonly payments: TbankPaymentService) {}
}
