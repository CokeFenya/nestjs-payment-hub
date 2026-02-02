"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTbankToken = buildTbankToken;
const crypto_1 = require("crypto");
const DEFAULT_IGNORED_KEYS = new Set([
    'Token',
    'Receipt',
    'DATA',
    'Data',
    'Items'
]);
function buildTbankToken(payload, password, ignoredKeys = DEFAULT_IGNORED_KEYS) {
    const entries = [];
    for (const [k, v] of Object.entries(payload !== null && payload !== void 0 ? payload : {})) {
        if (ignoredKeys.has(k))
            continue;
        if (v === undefined || v === null)
            continue;
        // берём только корневые значения (не объекты/массивы)
        if (typeof v === 'object')
            continue;
        entries.push([k, String(v)]);
    }
    entries.push(['Password', String(password)]);
    entries.sort((a, b) => a[0].localeCompare(b[0], 'en'));
    const concatenated = entries.map(([, val]) => val).join('');
    return (0, crypto_1.createHash)('sha256').update(concatenated, 'utf8').digest('hex');
}
