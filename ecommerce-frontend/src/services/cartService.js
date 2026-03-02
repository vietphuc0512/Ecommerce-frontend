import api from "./api";

export const addToCart = async (data) => {
  const res = await api.post("/Cart/add", data);
  return res.data;
};

export const getCart = async () => {
  const res = await api.get("/Cart");
  return res.data;
};
export const checkout = async () => {
  const res = await api.post("/Cart/checkout");
  return res.data;
};
export const removeFromCart = async (id) => {
  const res = await api.delete(`/Cart/remove/${id}`);
  return res.data;
};