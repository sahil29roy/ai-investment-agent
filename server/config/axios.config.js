import axios from 'axios';
import { FMP_API_KEY, FMP_API_URL } from './env.js';

const fmpClient = axios.create({
  baseURL: FMP_API_URL,
});

fmpClient.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    if (!config.params.apikey) {
      config.params.apikey = FMP_API_KEY;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default fmpClient;
