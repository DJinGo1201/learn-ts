import { isTypeOf } from './utils';

export function transformRequest(data: any): any {
  if (isTypeOf(data, 'object')) {
    return JSON.stringify(data);
  }
  return data;
}

export function transformResponse(data: any): any {
  if (isTypeOf(data, 'string')) {
    try {
      data = JSON.parse(data);
    } catch (e) { 
      // do nothing
    }
  }
  return data;
}