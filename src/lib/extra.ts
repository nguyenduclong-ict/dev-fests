import _path from 'path';
import qs from 'querystring';
import * as _ from 'lodash';

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

export function debounce(func, wait: number) {
  const timeouts = {};
  return function (...args) {
    const context = this;
    const { key, now } = args.pop() || {};
    if (timeouts[key]) clearTimeout(timeouts[key]);
    if (now) {
      func.apply(context, args);
    } else {
      const later = () => {
        timeouts[key] = null;
        func.apply(context, args);
      };
      timeouts[key] = setTimeout(later, wait);
    }
  };
}

export function replaceString(template: string, ...args) {
  args.forEach((value, index) => {
    template = template.replace(new RegExp(`\\$${index + 1}`, 'g'), value);
  });
  return template;
}

export function nowTime() {
  const now = new Date();
  return replaceString(
    '$1/$2/$3 $4:$5:$6',
    now.getDate(),
    now.getMonth(),
    now.getFullYear(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );
}

export function omit(object, omitValues = ['', undefined, null]) {
  Object.keys(object).forEach((key) => {
    if (omitValues.includes(key) || omitValues.includes(object[key])) {
      delete object[key];
    }
  });
  return object;
}

export function makeUrl(
  url: string | string[],
  query: { [x: string]: any } = {}
) {
  url = typeof url === 'string' ? [url] : url;
  url = url.map((item) => item.replace(/^\/|\/$/g, '')).join('/');
  const q = qs.stringify(query);
  return [url, q].filter((e) => e !== '').join('?');
}

export function pick(obj, properties = []) {
  const data = {};
  properties.forEach((property) => {
    _.set(data, property, _.get(obj, property));
  });
  return data;
}
