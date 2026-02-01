export const CryptoPayOptionsSymbol = Symbol.for(
	'nestjs-payment-hub:CryptoPayOptions'
)

export type CryptoPayModuleOptions = {
	token: string
	testnet?: boolean
}
