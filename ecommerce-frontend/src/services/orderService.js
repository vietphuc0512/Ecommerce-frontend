import api from "./api";

export const getOrders = async () => {
  const res = await api.get("/Order/my-orders"); // 🔥 GET đúng endpoint
  return res.data;
};