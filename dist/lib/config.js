"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultConfig = {
    dirroot: '',
    env: {
        PORT: 3000,
        NODE_ENV: 'development',
        UPLOAD_PATH: 'uploads',
        BCRYPT_SALT_ROUNDS: 10,
        JWT_SECRET: 'xztawer@~',
    },
    database: [],
};
class FesConfig {
    constructor() { }
    static setConfig(config) {
        if (!FesConfig.config) {
            FesConfig.config = defaultConfig;
        }
        config.env = Object.assign(Object.assign({}, defaultConfig.env), config.env);
        Object.assign(FesConfig.config, config);
    }
    static get Config() {
        if (!FesConfig.config) {
            FesConfig.config = defaultConfig;
        }
        return FesConfig.config;
    }
}
exports.setConfig = FesConfig.setConfig;
exports.Config = FesConfig.Config;
//# sourceMappingURL=config.js.map