import axios from '../../src/index';

axios({
  method: 'get',
  url: '/test/get',
  params: {
    a: 'test'
  },
  responseType: 'json'
}).then((res) => {
  console.log(res);
});

axios({
  method: 'post',
  url: '/test/post',
  headers: {
    'content-type': 'application/json',
    'accept': 'application/json, text/plain, */*'
  },
  data: {
    a: 'test'
  }
}).then((res) => {
  console.log(res);
})