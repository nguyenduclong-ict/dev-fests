import { setConfig, Config, IConfig } from '../config';
import { initRoutes } from '../router';
import { handleFesError } from '../error';
import path from 'path';
import express, { Express, json, urlencoded } from 'express';
import http, { Server } from 'http';
import logger from 'morgan';

async function start(): Promise<{ app?: Express; server?: Server }> {
  return new Promise(async (resolve) => {
    const { app, server, dirroot } = Config;
    // for dev
    app.use(logger('dev'));
    // use lib
    app.use(json());
    app.use(urlencoded({ extended: true }));
    // init router
    await initRoutes(app, path.join(dirroot, 'routes'));
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

export function createServer(config: IConfig, app?: Express, server?: Server) {
  setConfig(config);
  Config.app = app || express();
  Config.server = server || http.createServer(app);
  return { app, server, start };
}
