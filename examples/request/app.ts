import axios from '../../src/index';

// interface ResponseData<T = any> {
//   code: number
//   result: T
//   message: string
// }

// interface User {
//   name: string
//   age: number
// }

// function getUser<T>() {
//   return axios<ResponseData<T>>('/test/user')
//     .then(res => res.data)
//     .catch(err => console.error(err));
// }

// async function test() {
//   const user = await getUser<User>();
//   if (user) {
//     console.log(user.result)
//   }
// }

axios.interceptors.request.use(config => {
  config.data.data += '1';
  return config;
});

const requestInterceptor = axios.interceptors.request.use(config => {
  config.data.data += '2';
  return config;
})

axios.interceptors.request.use(config => {
  config.data.data += '3';
  return config;
});

axios.interceptors.request.eject(requestInterceptor);

axios.interceptors.response.use(res => {
  res.data.data += '4';
  return res;
})

const responseInterceptor = axios.interceptors.response.use(res => {
  res.data.data += '5';
  return res;
});

axios.interceptors.response.eject(responseInterceptor);

axios.post('/test/post', { data: '' }).then((res) => {
  console.log(res.data);
});