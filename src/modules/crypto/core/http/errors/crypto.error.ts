// src/modules/crypto/core/http/errors/crypto.error.ts
export class CryptoPayError extends Error {
	public constructor(
		public code: string,
		public description: string,
		public data?: any
	) {
		super(description)
		this.name = 'CryptoPayError'
	}
}
