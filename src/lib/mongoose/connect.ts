import { createConnection, ConnectionOptions } from 'mongoose';

// ------------------------------------------------------
export function connect({
  host,
  port,
  dbName,
  user,
  pass,
  authDb,
  config,
}: {
  host: string;
  port: string | number;
  dbName: string;
  user: string;
  pass: string;
  authDb?: string;
  config: ConnectionOptions;
}) {
  const defaultConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    ...config,
  };

  const uri = `mongodb://${host}:${port}`;
  return createConnection(uri, {
    ...defaultConfig,
    authSource: authDb || dbName,
    dbName,
    user,
    pass,
  });
}
