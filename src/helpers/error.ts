import { AxiosRequestConfig, AxiosResponseConfig } from '../types';

class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponseConfig

  constructor(err: {
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponseConfig
  }) {
    const { message, config, code, request, response } = err;
    super(message);
    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isAxiosError = true;

    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createEorror(err: {
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: AxiosResponseConfig
}) {
  const error = new AxiosError(err);
  return error;
}