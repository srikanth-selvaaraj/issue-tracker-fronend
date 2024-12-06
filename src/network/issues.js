import axiosClient from "./apiClient";

export const listIssuesAPI = (data = {}) =>
  axiosClient.get("/api/issues", { params: data });
