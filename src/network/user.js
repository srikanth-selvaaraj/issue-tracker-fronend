import axiosClient from "./apiClient";

export const registerUser = (data) => axiosClient.post('api/register', JSON.stringify(data));
export const userLogin = (data) => axiosClient.post('api/login', JSON.stringify(data));
export const refreshToken = (data) => axiosClient.post('api/token/refresh/', JSON.stringify(data))