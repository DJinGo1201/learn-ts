import { TypeName } from '../types';

const _toString = Object.prototype.toString;
const typesMap = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number',
  date: 'Date'
};

export function getType(item: any): string {
  return _toString.call(item).slice(8, -1);
}

export function isTypeOf(item: any, type: TypeName): boolean {
  return typesMap[type] === getType(item);
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ; (to as T & U)[key] = from[key] as any
  }
  return to as T & U;
}