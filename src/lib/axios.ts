import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { environment } from '../environtment/environtment';

const baseURL: string = environment.apiUrl;

const axiosIns = axios.create({ baseURL: baseURL });

// Request Interceptor
// Handler request
const requestHandler = (
  request: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return request;
};

// Response Interceptor
const responseHandler = (response: AxiosResponse): any => {
  return response.data;
};

// Error Handler
const errorHandler = (error: AxiosError): Promise<any> => {
  if (error.response) {
    const status = error.response.status;

    if (status === 401 || status === 403) {
      localStorage.clear();
      window.location.href = '/sign-in';
    }

    if (status === 500) {
      // Ganti dengan Angular global toast handler kalau ada
      //   callToaster('error', 'Internal Server Error');
    }

    return Promise.reject({ ...error });
  } else {
    console.error('No response from server:', error.message);
    return Promise.reject(error);
  }
};

// Setup interceptors
axiosIns.interceptors.request.use(requestHandler, errorHandler);
axiosIns.interceptors.response.use(responseHandler, errorHandler);

export default axiosIns;
