import type { TbankCommonResponse } from './common.response';
export interface TbankMirPayDeepLinkResponse extends TbankCommonResponse {
    DeepLink?: string;
}
