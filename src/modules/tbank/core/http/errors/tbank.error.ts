export class TbankError extends Error {
	public constructor(
		message: string,
		public readonly payload?: unknown
	) {
		super(message)
	}
}
