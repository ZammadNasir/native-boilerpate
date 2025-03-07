import { StorageKeys } from '@src/constants';
import { storage } from '@src/storage';
import axios from 'axios';
import CryptoJS from 'crypto-js';

// const BASE_URL = "http://localhost:2023/api/v1/";
// const BASE_URL = "http://localhost:2024/api/v1/";
const BASE_URL = process.env.REACT_APP_API_URL;
// const BASE_URL = "https://server.dominospizza.ge/api/v1/";
const secretKey = process.env.REACT_APP_SECRET_KEY || '';

const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
};
const decrypt = (ciphertext: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const getApiRequestHeader = async () => {
  /**Will get token from reducers */
  // const authtoken = JSON.parse((await localStorage.getItem("token")) as any);
  return {
    'Accept': 'text/plain',
    'Content-Type': 'text/plain',
    // Authorization: authtoken ? `Bearer ${authtoken}` : "",
  };
};
let instance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  withCredentials: true,
}) as any;

instance.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    let d_data = decrypt(error?.response?.data);
    let _data = JSON.parse(d_data);
    if (typeof _data === 'string') {
      _data = JSON.parse(_data);
    }
    if (error?.response?.status === 401) {
      storage.delete(StorageKeys.TOKEN);
    }
    return Promise.reject(error);
  }
);

const updateHeaders = async () => {
  const header = await getApiRequestHeader();
  instance.defaults.headers = header as any;
};

const request = async ({ method, url, data, headers }: any) => {
  if (headers === undefined) {
    await updateHeaders();
  } else {
    if (headers['Content-Type'] === 'multipart/form-data') {
      instance.defaults.headers = {
        ...instance.defaults.headers,
        'Content-Type': headers['Content-Type'],
      };
    }
  }

  let dataaa = data;

  if (headers?.['Content-Type'] !== 'multipart/form-data') {
    dataaa = encrypt(JSON.stringify(data));
  }

  const promise = instance[method](url, dataaa);
  let response;
  try {
    response = await promise;
  } catch (error: any) {
    let d_data = decrypt(error?.response?.data);
    let _data = JSON.parse(d_data);
    if (typeof _data === 'string') {
      _data = JSON.parse(_data);
    }
    return _data;
  }

  let d_data = decrypt(response?.data);
  let _data = JSON.parse(JSON.parse(d_data));
  return _data;
};

export const get = (url: string, permission_name: string, config: any) => {
  return request({
    method: 'get',
    url,
    data: {},
    ...config,
  });
};

export const post = (
  url: string,
  data: any,
  permission_name: string,
  config: any
) => {
  return request({
    method: 'post',
    url,
    data,
    ...config,
  });
};

export const patch = (
  url: string,
  data: any,
  permission_name: string,
  config: any
) => {
  return request({
    method: 'patch',
    url,
    data,
    ...config,
  });
};
