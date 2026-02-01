export const YookassaOptionsSymbol = Symbol.for(
	'nestjs-payment-hub:YookassaOptions'
)

export type YookassaModuleOptions = {
	shopId: string
	apiKey: string
	proxyUrl?: string
}
