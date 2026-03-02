import api from "./api";

export const getProducts = async () => {
  const res = await api.get("/Product"); 
  return res.data;
};

export const getProductById = async (id) => {
  const res = await api.get(`/Product/${id}`);
  return res.data;
};