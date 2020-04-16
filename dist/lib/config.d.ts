declare class FesConfig {
    static config: Config;
    private constructor();
    private static initDefaultConfig;
    static setConfig(config: Config): void;
    static get Config(): Config;
    static set Config(v: Config);
}
export interface Config {
    dirroot: string;
    env?: {
        [x: string]: string | number;
    };
    database?: Array<MongodbConfig>;
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
