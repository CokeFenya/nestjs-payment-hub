export interface TbankOptions {
    /**
     * TerminalKey (идентификатор терминала)
     */
    terminalKey: string;
    /**
     * Password (пароль терминала) — используется для формирования Token
     */
    password: string;
    /**
     * Базовый URL API
     * Обычно: https://securepay.tinkoff.ru
     */
    baseUrl?: string;
    /**
     * Таймаут HTTP (мс)
     */
    timeoutMs?: number;
}
