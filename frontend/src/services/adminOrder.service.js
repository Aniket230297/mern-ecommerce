import api from "../api/axios";

export const getAllOrders = async () => {
  const res = await api.get("/orders/admin");
  return res.data;
};

export const updateOrderStatus = async (id, orderStatus) => {
  const res = await api.put(`/orders/${id}`, {
    orderStatus,
  });

  return res.data;
};