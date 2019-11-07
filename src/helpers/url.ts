import { isTypeOf } from './utils';

function encodeURL(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']')
}

export function buildURL(url: string, params: any): string {
  if (!params) return url;

  const parts: string[] = [];

  Object.keys(params).forEach((key) => {
    const val = params[key];
    if (isTypeOf(val, 'null') || isTypeOf(val, 'undefined')) return;

    let values = [];
    if (isTypeOf(val, 'array')) {
      values = val;
      key += '[]'
    } else {
      values = [val];
    }

    values.forEach((v: any) => {
      if (isTypeOf(v, 'date')) {
        v = v.toISOString()
      } else if (isTypeOf(v, 'object')) {
        v = JSON.stringify(v);
      }
      parts.push(`${encodeURL(key)}=${encodeURL(v)}`);
    })
  })

  let serializedParams = parts.join('&');
  if (serializedParams) {
    const wellIndex = url.indexOf('#');
    if (wellIndex !== -1) {
      url = url.slice(0, wellIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}