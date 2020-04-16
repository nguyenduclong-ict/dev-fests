import { setConfig, Config } from './lib/config';
import { initRoutes } from './lib/router';
import path from 'path';
import express, { Express, json } from 'express';
import http, { Server } from 'http';
import logger from 'morgan';
import { FesError, handleFesError } from './lib/error';

let _beforeStart: (
    app: Express,
    server: Server,
    config?: Config
  ) => Promise<any>,
  _app,
  _server;

async function start(): Promise<{ app?: Express; server?: Server }> {
  return new Promise(async (resolve) => {
    const app: Express = _app;
    const config = Config;
    const server = _server;
    // run hook beforeStart
    if (_beforeStart) {
      await _beforeStart(app, server, config);
    }
    // for dev
    app.use(logger('dev'));
    // use lib
    app.use(json());
    // init router
    await initRoutes(app, path.join(config.dirroot, 'routes'));
    // handle Error
    app.use(handleFesError);
    // start server
    const port = Number(process.env.PORT);
    app.listen(port, () => {
      console.log('Server listen on port', port);
      resolve({ app, server });
    });
  });
}

function beforeStart(
  f: (app: Express, server: Server, config?: Config) => Promise<void>
) {
  _beforeStart = f;
  return { start };
}

export function FesServer(config: Config, app?: Express, server?: Server) {
  _app = app || express();
  _server = server || http.createServer(app);
  setConfig(config);
  Object.assign(process.env, config.env);
  return { beforeStart, start };
}

export * from './lib/config';
export * as Mongoose from './lib/mongoose';
export * from './lib/error';
