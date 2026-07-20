import api from "../api/axios";

export const createOrder = async (orderData) => {
  const res = await api.post("/orders", orderData);
  return res.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders/my");
  return res.data;
};

export const getOrderById = async (id) => {
  const res = await api.get(`/orders/${id}`);
  return res.data;
};


// =======================
// ADMIN APIs
// =======================

// Get All Orders
export const getOrders = async () => {
  const res = await api.get("/orders");
  return res.data;
};

// Update Order Status
export const updateOrderStatus = async (id, orderStatus) => {
  const res = await api.put(`/orders/${id}`, {
    orderStatus,
  });

  return res.data;
};