class FesConfig {
  static config: Config;

  private constructor() {}
  private static initDefaultConfig() {
    FesConfig.config = {
      dirroot: '',
      env: {
        PORT: 3000,
        NODE_ENV: 'DEV',
      },
      database: [],
    };
  }

  static setConfig(config: Config) {
    if (!FesConfig.config) {
      this.initDefaultConfig();
    }
    Object.assign(FesConfig.config, config);
  }

  public static get Config(): Config {
    if (!FesConfig.config) {
      this.initDefaultConfig();
    }
    return FesConfig.config;
  }

  public static set Config(v: Config) {}
}

export interface Config {
  dirroot: string;
  env?: { [x: string]: string | number };
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

export const setConfig = FesConfig.setConfig;
export const Config = FesConfig.Config;
