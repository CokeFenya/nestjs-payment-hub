export interface TpayStatusResponse {
	Success?: boolean
	ErrorCode?: string
	Message?: string
	Details?: string

	TerminalKey?: string
	Status?: string // в доке формулируется как доступность/возможность
	// оставляем гибко, т.к. поля могут отличаться по терминалам
	[k: string]: any
}
