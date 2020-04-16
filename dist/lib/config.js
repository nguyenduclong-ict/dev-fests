"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FesConfig {
    constructor() { }
    static initDefaultConfig() {
        FesConfig.config = {
            dirroot: '',
            env: {
                PORT: 3000,
                NODE_ENV: 'DEV',
            },
            database: [],
        };
    }
    static setConfig(config) {
        if (!FesConfig.config) {
            this.initDefaultConfig();
        }
        Object.assign(FesConfig.config, config);
    }
    static get Config() {
        if (!FesConfig.config) {
            this.initDefaultConfig();
        }
        return FesConfig.config;
    }
    static set Config(v) { }
}
exports.setConfig = FesConfig.setConfig;
exports.Config = FesConfig.Config;
//# sourceMappingURL=config.js.map