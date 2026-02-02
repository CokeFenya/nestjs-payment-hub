import { createHash } from 'crypto'

type AnyRecord = Record<string, any>

const DEFAULT_IGNORED_KEYS = new Set([
	'Token',
	'Receipt',
	'DATA',
	'Data',
	'Items'
])

export function buildTbankToken(
	payload: AnyRecord,
	password: string,
	ignoredKeys = DEFAULT_IGNORED_KEYS
) {
	const entries: Array<[string, string]> = []

	for (const [k, v] of Object.entries(payload ?? {})) {
		if (ignoredKeys.has(k)) continue
		if (v === undefined || v === null) continue
		// берём только корневые значения (не объекты/массивы)
		if (typeof v === 'object') continue
		entries.push([k, String(v)])
	}

	entries.push(['Password', String(password)])
	entries.sort((a, b) => a[0].localeCompare(b[0], 'en'))

	const concatenated = entries.map(([, val]) => val).join('')

	return createHash('sha256').update(concatenated, 'utf8').digest('hex')
}
