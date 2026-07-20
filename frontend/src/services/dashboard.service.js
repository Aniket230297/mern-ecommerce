import api from "../api/axios";

export const getDashboardStats = async () => {
  const res = await api.get("/dashboard");

  return res.data;
};