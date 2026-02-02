export class TbankError extends Error {
	public constructor(
		public readonly type: string,
		public readonly message: string,
		public readonly raw?: any
	) {
		super(message)
	}
}
