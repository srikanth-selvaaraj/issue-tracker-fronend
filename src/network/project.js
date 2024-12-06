import axiosClient from "./apiClient";

export const getProjects = (data) =>
  axiosClient.get("/api/projects", { params: data });
export const createProjectAPI = (data) =>
  axiosClient.post("/api/projects", JSON.stringify(data));
export const updateProjectAPI = (id, data) =>
  axiosClient.put(`/api/project/${id}`, JSON.stringify(data));
export const deleteProjectAPI = (id) =>
  axiosClient.delete(`/api/project/${id}`);
