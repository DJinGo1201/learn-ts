import axios from '../../src/index';

axios({
  method: 'get',
  url: '/error/get1',
  params: {
    a: 'test'
  },
  responseType: 'json'
}).then((res) => {
  console.log(res);
}).catch((e) => {
  console.error(e);
});

axios({
  method: 'get',
  url: '/error/get',
  params: {
    a: 'test'
  }
}).then((res) => {
  console.log(res);
}).catch((e) => {
  console.error(e.response);
});

axios({
  method: 'get',
  url: '/error/timeout',
  params: {
    a: 'test'
  },
  timeout: 2000
}).then((res) => {
  console.log(res);
}).catch((e) => {
  console.error(e.message);
});