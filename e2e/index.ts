import { IConfig, createServer } from '../package';

console.log(createServer);
const config: IConfig = {
  dirroot: __dirname,
  env: {
    PORT: 3002,
  },
};

const { app, server, start } = createServer(config);

start();
