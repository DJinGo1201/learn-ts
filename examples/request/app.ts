import axios from '../../src/index';
import qs from 'qs';
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

axios({
  url: '/test/post',
  method: 'post',
  data: {
    a: 1
  },
  headers: {
    test: '12',
    'Content-Type': 'application/json; charset=utf-8'
  },
  transformRequest: [function (data) {
    return JSON.stringify(data);
  }],
  transformResponse: [function (data) {
    data.b = 3;
    return data;
  }]
}).then((res) => {
  console.log(res);
})
