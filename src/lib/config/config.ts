import { assignObject } from '../extra';
import { Express } from 'express';
import { Server } from 'http';
import { IConfig } from './declare';

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

export class FesJsConfig {
  static config: IConfig;
  static app: Express;
  static server: Server;

  private constructor() {}

  static setConfig(config: IConfig) {
    if (!this.config) {
      this.config = defaultConfig;
    }
    assignObject(process.env, config.env);
    assignObject(this.config, config);
  }

  public static get Config(): IConfig {
    if (!this.config) {
      this.config = defaultConfig;
    }
    return this.config;
  }
}

export const Config = FesJsConfig.Config;
export const setConfig = FesJsConfig.setConfig;
