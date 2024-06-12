// import axios from "axios";

// export default defineNuxtPlugin(() => {
//   const domain = 'http://localhost:3333/'

//   let api = axios.create({
//     baseURL: domain,
//     headers: {
//       common: {
//         Authorization: `Bearer`
//       }
//     }
//   });

//   api.interceptors.response.use(function (response) {
//     return response.data;
//   }, function (error) {
//     return Promise.reject(error);
//   });

//   return {
//     provide: {
//       api: api
//     }
//   }
// });

import axios from "axios";

export default defineNuxtPlugin(() => {
  const domain = 'http://localhost:3333/'

  let api = axios.create({
    baseURL: domain,
    headers: {
      common: {
        Authorization: `Bearer`
      }
    }
  });

  api.interceptors.response.use(function (response) {
    if (process.client) {
    // console.log(window.localStorage.getItem('token'));
    }
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });
  api.interceptors.request.use(function (teste) {
    if (process.client) {
      let key = window.localStorage.getItem('token')
      teste.headers.Authorization = `Bearer ${key}`
    }
    return teste
  })

  // api.interceptors.request.use((_) => {
  //   console.log(window.localStorage.getItem('token'));
  // })

  return {
    provide: {
      api: api
    }
  }
})
