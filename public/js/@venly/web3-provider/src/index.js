"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Venly = void 0;
var tslib_1 = require("tslib");
var VenlyWalletSubProvider_1 = require("./VenlyWalletSubProvider");
var NonceTracker_1 = require("./NonceTracker");
var SignedVersionedTypedDataSubProvider_1 = require("./SignedVersionedTypedDataSubProvider");
var connect_1 = require("@venly/connect");
var SignTransactionGasFix_1 = require("./SignTransactionGasFix");
var ProviderEngine = require('@arkane-network/web3-provider-engine');
var CacheSubprovider = require('@arkane-network/web3-provider-engine/subproviders/cache');
var FixtureSubprovider = require('@arkane-network/web3-provider-engine/subproviders/fixture');
var FilterSubprovider = require('@arkane-network/web3-provider-engine/subproviders/filters');
var RpcSubprovider = require('@arkane-network/web3-provider-engine/subproviders/rpc');
var SubscriptionsSubprovider = require('@arkane-network/web3-provider-engine/subproviders/subscriptions');
var SanitizingSubprovider = require('@arkane-network/web3-provider-engine/subproviders/sanitizer');
var InflightCacheSubprovider = require('@arkane-network/web3-provider-engine/subproviders/inflight-cache');
var WebsocketSubprovider = require('@arkane-network/web3-provider-engine/subproviders/websocket');
var VenlySubProvider = /** @class */ (function () {
    function VenlySubProvider() {
    }
    VenlySubProvider.prototype.connect = function () {
        return this.venlyConnect;
    };
    VenlySubProvider.prototype.changeSecretType = function (secretType) {
        if (secretType === void 0) { secretType = connect_1.SecretType.ETHEREUM; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (this.subProvider && this.subProvider.options) {
                    this.subProvider.options.secretType = secretType;
                    this.subProvider.lastWalletsFetch = undefined;
                    this.engine.stop();
                    return [2 /*return*/, this.createProviderEngine(this.subProvider.options)];
                }
                return [2 /*return*/];
            });
        });
    };
    VenlySubProvider.prototype.hasSubProvider = function () {
        return !!this.subProvider;
    };
    VenlySubProvider.prototype.checkAuthenticated = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!this.subProvider) {
                    throw new Error('Please initialise provider first (Venly.createProviderEngine)');
                }
                return [2 /*return*/, this.subProvider.checkAuthenticated()];
            });
        });
    };
    VenlySubProvider.prototype.authenticate = function (authenticationOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (!this.subProvider) {
                    throw new Error('Please initialise provider first (Venly.createProviderEngine)');
                }
                return [2 /*return*/, this.subProvider.startGetAccountFlow(authenticationOptions)];
            });
        });
    };
    VenlySubProvider.prototype.createProviderEngine = function (options) {
        var _this = this;
        var connectionDetails = this.getConnectionDetails(options);
        this.engine = new ProviderEngine({ pollingInterval: options.pollingInterval || 15000 });
        this.engine.addProvider(new FixtureSubprovider({
            web3_clientVersion: 'VenlyProviderEngine/v0.21.0/javascript',
            net_listening: true,
            eth_hashrate: '0x00',
            eth_mining: false,
            eth_syncing: true,
        }));
        this.engine.addProvider(new SignTransactionGasFix_1.SignTransactionGasFix());
        if (!this.subProvider) {
            this.subProvider = new VenlyWalletSubProvider_1.VenlyWalletSubProvider(options);
        }
        this.venlyConnect = this.subProvider.connect;
        if (!this.signedVersionedTypedDataSubProvider) {
            this.signedVersionedTypedDataSubProvider = new SignedVersionedTypedDataSubProvider_1.SignedVersionedTypedDataSubProvider(this.subProvider);
        }
        this.engine.addProvider(this.signedVersionedTypedDataSubProvider);
        this.engine.addProvider(new FilterSubprovider());
        this.nonceSubProvider = new NonceTracker_1.NonceTrackerSubprovider({ rpcUrl: connectionDetails.endpointHttpUrl });
        this.engine.addProvider(this.nonceSubProvider);
        this.engine.addProvider(new SanitizingSubprovider());
        this.engine.addProvider(new SubscriptionsSubprovider());
        this.engine.addProvider(new CacheSubprovider());
        this.engine.addProvider(new InflightCacheSubprovider());
        this.rpcSubProvider = new RpcSubprovider({ rpcUrl: connectionDetails.endpointHttpUrl });
        this.engine.addProvider(this.subProvider);
        this.engine.addProvider(this.rpcSubProvider);
        return options.skipAuthentication
            ? Promise.resolve(this.startEngine(this.engine))
            : this.subProvider.getAccountsAsync().then(function () { return _this.startEngine(_this.engine); });
    };
    VenlySubProvider.prototype.getConnectionDetails = function (options) {
        var secretType = options.secretType ? options.secretType : connect_1.SecretType.ETHEREUM;
        var environment = options.environment;
        environment = environment === null || environment === void 0 ? void 0 : environment.replace('-local', '');
        var endpoint = secretType.toLowerCase() + "-node" + (environment && !environment.startsWith('prod') ? '-' + environment : '') + ".arkane.network";
        return {
            endpointHttpUrl: 'https://' + endpoint
        };
    };
    VenlySubProvider.prototype.startEngine = function (engine) {
        // network connectivity error
        engine.on('error', function (err) {
            // report connectivity errors
            console.error(err.stack);
        });
        // start polling for blocks
        engine.start();
        return engine;
    };
    return VenlySubProvider;
}());
var ConnectionDetails = /** @class */ (function () {
    function ConnectionDetails(endpointHttpUrl, endpointWsUrl) {
        this.endpointHttpUrl = endpointHttpUrl;
        this.endpointWsUrl = endpointWsUrl;
    }
    return ConnectionDetails;
}());
if (typeof window !== 'undefined') {
    window.Venly = new VenlySubProvider();
}
exports.Venly = VenlySubProvider.prototype;
//# sourceMappingURL=index.js.map