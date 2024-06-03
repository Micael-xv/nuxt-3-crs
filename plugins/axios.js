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
    return response.data;
  }, function (error) {
    return Promise.reject(error);
  });

  return {
    provide: {
      api: api
    }
  }
});