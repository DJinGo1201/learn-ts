import { isTypeOf, deepMerge } from './utils';
import { Method } from '../types';

function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) return;
  Object.keys(headers).forEach((name) => {
    if (name !== normalizeName && name.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name];
      delete headers[name];
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  if (isTypeOf(data, 'object')) {
    normalizeHeaderName(headers, 'Content-Type');
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null);
  if (!headers) return parsed;

  headers.split('\r\n').forEach((header) => {
    let [key, val] = header.split(':');
    key = key.trim().toLowerCase();
    if (!key) return;
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  })

  return parsed;
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers;

  headers = deepMerge(headers.common, headers[method], headers);

  const methodsToDelete = ['get', 'head', 'options', 'delete', 'post', 'put', 'patch', 'common'];

  methodsToDelete.forEach(method => {
    delete headers[method];
  });

  return headers;
}