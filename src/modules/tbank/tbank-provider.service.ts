import { Injectable } from '@nestjs/common'
import { TbankCardService } from './card/card.service'
import { TbankFiscalizationService } from './fiscalization/fiscalization.service'
import { TbankSberPayService } from './sberpay/sberpay.service'
import { TbankSbpService } from './sbp'
import { TbankTpayService } from './tpay'

@Injectable()
export class TbankProviderService {
	public constructor(
		public readonly card: TbankCardService,
		public readonly sbp: TbankSbpService,
		public readonly tpay: TbankTpayService,
		public readonly sberpay: TbankSberPayService,
		public readonly fiscalization: TbankFiscalizationService
	) {}
}
