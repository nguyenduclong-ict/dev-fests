declare class FesConfig {
    static config: Config;
    private constructor();
    static setConfig(config: Config): void;
    static get Config(): Config;
}
export interface Config {
    dirroot: string;
    env?: EnvConfig;
    database?: MongodbConfig[];
}
interface EnvConfig {
    PORT?: number;
    BCRYPT_SALT_ROUNDS?: number;
    JWT_SECRET?: string;
    UPLOAD_PATH?: string;
    NODE_ENV?: 'development' | 'production' | string;
    [x: string]: string | number;
}
export interface MongodbConfig {
    type: 'mongo';
    host: string;
    dbName: string;
    port?: number | string;
    user?: string;
    pass?: string;
}
export declare const setConfig: typeof FesConfig.setConfig;
export declare const Config: Config;
export {};
