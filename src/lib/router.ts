import fs from 'fs';
import Path from 'path';
import { Express } from 'express';

export async function initRoutes(app: Express, path) {
  const routes = await getEntryRoutes(path, '/');
  routes.forEach((route) => {
    app.use(route.routePath, route.i.default);
  });
  return true;
}

async function getMappedRoutes(path, parent = '/'): Promise<Route> {
  const stats = fs.lstatSync(path);
  if (stats.isDirectory()) {
    const dir = fs.readdirSync(path);
    const children = await Promise.all(
      dir
        .map((fileName) => Path.join(path, fileName))
        .filter(isValidFile)
        .map((filePath) =>
          getMappedRoutes(
            filePath,
            Path.join(parent, Path.parse(filePath).name.split('.').shift())
          )
        )
    );

    return {
      routePath: parent,
      children,
    };
  } else if (stats.isFile()) {
    const route = await import(path);
    return {
      routePath: parent.replace('//index$/', '/'),
      i: route,
    };
  }
}

interface Route {
  routePath: string;
  i?;
  children?: Route[];
}

function isValidFile(path: string) {
  const validRegex = [/\.route\.js$/];
  const stats = fs.statSync(path);
  const file = Path.parse(path);
  return (
    stats.isDirectory() || validRegex.every((regex) => regex.test(file.base))
  );
}

async function getEntryRoutes(path, parent = '/'): Promise<Route[]> {
  const result: Route[] = [];
  const stats = fs.lstatSync(path);
  if (stats.isDirectory()) {
    const dir = fs.readdirSync(path);
    const arr = await Promise.all(
      dir
        .map((fileName) => Path.join(path, fileName))
        .filter(isValidFile)
        .map((filePath) =>
          getEntryRoutes(
            filePath,
            Path.join(parent, Path.parse(filePath).name.split('.').shift())
          )
        )
    );

    arr.forEach((routes) => {
      result.push(...routes);
    });
  } else if (stats.isFile()) {
    const route = await import(path);
    result.push({
      routePath: parent.replace(/\/index$/, ''),
      i: route,
    });
  }
  return result;
}

async function entriesRoute(module: Route): Promise<Route[]> {
  const result: Route[] = [];
  if (module.i) {
    result.push({
      routePath: module.routePath,
      i: module.i,
    });
  }

  if (module.children) {
    const ms = await Promise.all(module.children.map((m) => entriesRoute(m)));
    ms.forEach((m) => result.push(...m));
  }
  return result;
}
