import { AxiosRequestConfig, AxiosPromise, AxiosResponseConfig } from '../types';
import xhr from './xhr';
import { buildURL } from '../helpers/url';
import { flattenHeaders } from '../helpers/headers';
import transform from './transform';

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
};

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.data = transform(config.data, config.headers, config.transformRequest);
  config.headers = flattenHeaders(config.headers, config.method!);
};

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
};

function transformResponseData(res: AxiosResponseConfig): AxiosResponseConfig {
  res.data = transform(res.data, res.headers, res.config.transformResponse);
  return res;
}

export default dispatchRequest;