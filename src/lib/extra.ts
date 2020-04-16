import _path from 'path';

export function extraObject(
  object = {},
  parent = ''
): { path: string; value: any }[] {
  let results = [];
  if (isObject(object)) {
    Object.keys(object).forEach((key) => {
      results.push(...extraObject(object[key], _path.join(parent, key)));
    });
  } else {
    results = [
      {
        path: parent,
        value: object,
      },
    ];
  }
  return results;
}

export function isObject(value) {
  return typeof value === 'object' && !Array.isArray(value);
}

export function set(object: object, path: string[] | string, value) {
  if (!isObject(object)) return;
  path = Array.isArray(path) ? path : path.split(/\/|\./);
  while (path.length > 1) {
    const key = path.shift();
    object[key] = object[key] || {};
    object = object[key];
  }
  object[path.shift()] = value;
}

export function assignObject(target: object, source: object) {
  extraObject(source).forEach((item) => {
    set(target, item.path, item.value);
  });
}
