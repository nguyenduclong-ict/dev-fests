import { setConfig, Config } from './lib/config';
import { initRoutes } from './lib/router';
import path from 'path';
import express, { Express, json, urlencoded } from 'express';
import http, { Server } from 'http';
import logger from 'morgan';
import { handleFesError } from './lib/error';

let _beforeStart: (
  Config?: Config,
  app?: Express,
  server?: Server
) => Promise<any>;
let _app: Express;
let _server: Server;

async function start(): Promise<{ app?: Express; server?: Server }> {
  return new Promise(async (resolve) => {
    const app: Express = _app;
    const config = Config;
    const server = _server;
    // run hook beforeStart
    if (_beforeStart) {
      await _beforeStart(config, app, server);
    }
    // for dev
    app.use(logger('dev'));
    // use lib
    app.use(json());
    app.use(urlencoded({ extended: true }));
    // init router
    await initRoutes(app, path.join(config.dirroot, 'routes'));
    // handle Error
    app.use(handleFesError);
    // start server
    const port = Number(process.env.PORT);
    server.listen(port, () => {
      console.log('Server listen on port', port);
      resolve({ app, server });
    });
  });
}

function beforeStart(
  f: (Config?: Config, app?: Express, server?: Server) => Promise<void>
) {
  _beforeStart = f;
  return { start };
}

export function FesServer(config: Config, app?: Express, server?: Server) {
  _app = app || express();
  _server = server || http.createServer(app);
  setConfig(config);
  Object.assign(process.env, Config.env);
  return { beforeStart, start };
}

export * from './lib/config';
export * from './lib/error';
