"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TBANK_IP_WHITELIST = void 0;
/**
 * Внешние сети, которые использует T-Bank для HTTP(S) уведомлений.
 * Плюс тестовый IP. :contentReference[oaicite:1]{index=1}
 */
exports.TBANK_IP_WHITELIST = [
    '91.194.226.0/23',
    '91.218.132.0/24',
    '91.218.133.0/24',
    '91.218.134.0/24',
    '91.218.135.0/24',
    '212.49.24.0/24',
    '212.233.80.0/24',
    '212.233.81.0/24',
    '212.233.82.0/24',
    '212.233.83.0/24',
    // тестовая среда (точечный IP)
    '91.194.226.181'
];
