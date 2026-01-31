"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoAssetEnum = void 0;
/**
 * Поддерживаемые крипто-активы (mainnet) по документации Crypto Pay API.
 */
var CryptoAssetEnum;
(function (CryptoAssetEnum) {
    CryptoAssetEnum["USDT"] = "USDT";
    CryptoAssetEnum["TON"] = "TON";
    CryptoAssetEnum["BTC"] = "BTC";
    CryptoAssetEnum["ETH"] = "ETH";
    CryptoAssetEnum["LTC"] = "LTC";
    CryptoAssetEnum["BNB"] = "BNB";
    CryptoAssetEnum["TRX"] = "TRX";
    CryptoAssetEnum["USDC"] = "USDC";
})(CryptoAssetEnum || (exports.CryptoAssetEnum = CryptoAssetEnum = {}));
