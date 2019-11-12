import { AxiosTransformer } from '../types';
import { isTypeOf } from '../helpers/utils';

export default function transform(data: any, headers: any, fns?: AxiosTransformer | AxiosTransformer[]): any {
  if (!fns) {
    return data;
  }
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach(fn => {
    if (isTypeOf(fn, 'function')) {
      data = fn(data, headers)
    }
  })
  return data;
}