import { AxiosRequestConfig, AxiosResponseConfig, AxiosPromise } from '../types';
import { parseHeaders } from '../helpers/headers';
import { transformResponse } from '../helpers/data';
import { createEorror } from '../helpers/error';

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType, timeout } = config;
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout;
    }

    request.open(method.toUpperCase(), url!, true);

    request.onreadystatechange = function () {
      if (request.readyState !== 4) return;
      if (request.status === 0) return;
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType !== 'text' ? request.response : request.responseText;
      const response: AxiosResponseConfig = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response);
    };

    request.onerror = function () {
      reject(createEorror({
        message: 'Network Error',
        config,
        code: null,
        request
      }));
    };

    request.ontimeout = function () {
      reject(createEorror({
        message: `Timout of ${timeout} ms exceeded`,
        config,
        code: 'ECONNABORTED',
        request
      }));
    };

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    })

    request.send(data);

    function handleResponse(response: AxiosResponseConfig): void {
      if ((response.status >= 200 && response.status < 300) || response.status === 304) {
        resolve(response);
      } else {
        reject(createEorror({
          message: `Request failed with status code ${response.status}`,
          config,
          code: null,
          request,
          response
        }));
      }
    }
  })
}