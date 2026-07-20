import api from "../api/axios";

// Get All
export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

// Get One
export const getCategoryById = async (id) => {
  const res = await api.get(`/categories/${id}`);
  return res.data;
};

// Create
export const createCategory = async (data) => {
  const res = await api.post("/categories", data);
  return res.data;
};

// Update
export const updateCategory = async (id, data) => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

// Delete
export const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};