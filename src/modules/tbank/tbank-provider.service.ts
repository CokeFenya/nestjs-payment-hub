import { Injectable } from '@nestjs/common'
import { TbankMirPayService } from './mirpay/mirpay.service'
import { TbankPaymentService } from './payment/payment.service'
import { TbankSbpService } from './sbp/sbp.service'
import { TbankTpayService } from './tpay/tpay.service'

@Injectable()
export class TbankProviderService {
	public constructor(
		public readonly payments: TbankPaymentService,
		public readonly sbp: TbankSbpService,
		public readonly tpay: TbankTpayService,
		public readonly mirpay: TbankMirPayService
	) {}
}
