"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoPayAssetEnum = void 0;
/**
 * Поддерживаемые ассеты (mainnet) по документации.
 * testnet дополнительно имеет JET.
 */
var CryptoPayAssetEnum;
(function (CryptoPayAssetEnum) {
    CryptoPayAssetEnum["USDT"] = "USDT";
    CryptoPayAssetEnum["TON"] = "TON";
    CryptoPayAssetEnum["BTC"] = "BTC";
    CryptoPayAssetEnum["ETH"] = "ETH";
    CryptoPayAssetEnum["LTC"] = "LTC";
    CryptoPayAssetEnum["BNB"] = "BNB";
    CryptoPayAssetEnum["TRX"] = "TRX";
    CryptoPayAssetEnum["USDC"] = "USDC";
    // testnet only
    CryptoPayAssetEnum["JET"] = "JET";
})(CryptoPayAssetEnum || (exports.CryptoPayAssetEnum = CryptoPayAssetEnum = {}));
