import type { TbankOptions } from '../../../../common/interfaces/tbank/tbank-options.interface';
/**
 * Token (подпись) T-Bank:
 * - учитываем только поля ВЕРХНЕГО уровня (примитивы), вложенные объекты/массивы исключаем
 * - исключаем Token и Password
 * - добавляем Password
 * - сортируем ключи по алфавиту
 * - склеиваем значения
 * - sha256 hex
 *
 * Док: формирование Token. :contentReference[oaicite:0]{index=0}
 */
export declare function createTbankToken(root: Record<string, unknown>, password: string, excludeKeys?: readonly string[]): string;
export declare class TbankHttpClient {
    private readonly http;
    private readonly terminalKey;
    private readonly password;
    constructor(options: TbankOptions);
    post<TResponse, TBody extends object>(path: string, body: TBody): Promise<TResponse>;
    get<TResponse>(path: string, params?: Record<string, unknown>): Promise<TResponse>;
    private sign;
}
