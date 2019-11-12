import { AxiosRequestConfig } from '../types';
import { isTypeOf, deepMerge } from '../helpers/utils';

const strategies = Object.create(null);

function defaultStrategy(val1: any, val2: any): any {
  return (isTypeOf(val2, 'undefined')) ? val1 : val2;
}

function fromVal2Strategy(val1: any, val2: any) {
  return val2;
}

function deepMergeStrategy(val1: any, val2: any): any {
  if (isTypeOf(val2, 'object')) {
    return deepMerge(val1, val2);
  } else if (!isTypeOf(val2, 'undefined')) {
    return val2;
  } else if (isTypeOf(val1, 'object')) {
    return deepMerge(val1);
  } else if (!isTypeOf(val1, 'undefined')) {
    return val1;
  }
}

const fromVal2StrategyKeys = ['url', 'params', 'data'];

fromVal2StrategyKeys.forEach((key) => {
  strategies[key] = fromVal2Strategy;
});

const deepMergeStrategyKeys = ['headers'];

deepMergeStrategyKeys.forEach((key) => {
  strategies[key] = deepMergeStrategy;
});

strategies['transformRequest'] = function (val1: any, val2: any): any {
  if (val2) {
    return isTypeOf(val2, 'array') ? val2.concat(val1) : val1.unshift(val2);
  } else {
    return val1
  }
}

strategies['transformResponse'] = function (val1: any, val2: any): any {
  if (val2) {
    return val1.concat(val2);
  } else {
    return val1
  }
}

export default function mergeConfig(target: AxiosRequestConfig, source?: AxiosRequestConfig) {
  if (!source) source = {};
  const config = Object.create(null);

  function mergeStrategy(key: string) {
    const strategy = strategies[key] || defaultStrategy;
    config[key] = strategy(target[key], source![key]);
  }

  for (const key in source) {
    mergeStrategy(key);
  }

  for (const key in target) {
    if (isTypeOf(source[key], 'undefined')) {
      mergeStrategy(key);
    }
  }

  console.log(config);

  return config;
}