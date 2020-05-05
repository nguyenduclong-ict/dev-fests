import { Express } from 'express';
import { Server } from 'http';

export interface IConfig {
  dirroot: string;
  env?: EnvConfig;
  database?: MongodbConfig[];
  app?: Express;
  server?: Server;
}

export interface EnvConfig {
  PORT?: number;
  BCRYPT_SALT_ROUNDS?: number;
  JWT_SECRET?: string;
  UPLOAD_PATH?: string;
  NODE_ENV?: 'development' | 'production' | string;

  [x: string]: any;
}

export interface MongodbConfig {
  type: 'mongo';
  host: string;
  dbName: string;
  port?: number | string;
  user?: string;
  pass?: string;
  instance: any;
}
