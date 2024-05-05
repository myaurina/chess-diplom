/* eslint-disable no-param-reassign */
import axios from "axios";
import GlobalApi from "@/api/routes";
import Router from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: `${window.location}/api/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "ru",
  },
});

const refreshToken = (access_token) => {
  return axios.post(`${window.location}/api/auth/refresh`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err?.response?.status === 401 && !err?.config?.isRetryRequest) {
      const oldAccessToken = window.localStorage.getItem("access_token");
      if (oldAccessToken) {
        try {
          const { data } = await refreshToken(oldAccessToken);
          const newAccessToken = data.access_token;

          localStorage.setItem("access_token", newAccessToken);
          err.config.isRetryRequest = true;
          err.config.headers.Authorization = `Bearer ${newAccessToken}`;

          return axiosInstance.request(err.config);
        } catch {
          localStorage.removeItem("access_token");
          await Router.push({ pathname: "/auth" });
        }
      }
      window.location = "/login";
    }
    return Promise.reject(err);
  }
);

const Api = new GlobalApi(axiosInstance);

export default Api;
