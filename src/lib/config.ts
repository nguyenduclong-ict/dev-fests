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
  static config: Config;
  private constructor() {}

  static setConfig(config: Config) {
    if (!FesConfig.config) {
      FesConfig.config = defaultConfig;
    }
    config.env = { ...defaultConfig.env, ...config.env };
    Object.assign(FesConfig.config, config);
  }

  public static get Config(): Config {
    if (!FesConfig.config) {
      FesConfig.config = defaultConfig;
    }
    return FesConfig.config;
  }
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

export const setConfig = FesConfig.setConfig;
export const Config = FesConfig.Config;
