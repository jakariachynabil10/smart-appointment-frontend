/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
;

import { getFromLocalStorage } from '@/utils/local-storage';
import { authKey } from '@/contents/authKey';
import { IGenericErrorResponse, ResponseSuccessType } from '@/types/common';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Any status code that lie within the range of 2xx
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    // Any status codes outside 2xx
    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || 'Something went wrong!!!',
      errorMessages: error?.response?.data?.message,
    };
    return Promise.reject(responseObject);
  }
);

export { instance as axiosInstance};
