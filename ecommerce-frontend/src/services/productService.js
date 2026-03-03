import axiosInstance from "./api";   

// GET ALL
export const getProducts = async () => {
  const res = await axiosInstance.get("/Product");
  return res.data;
};

// GET BY ID
export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/Product/${id}`);
  return res.data;
};

// CREATE
export const createProduct = async (product) => {
  const res = await axiosInstance.post("/Product", product);
  return res.data;
};

// UPDATE
export const updateProduct = async (id, product) => {
  const res = await axiosInstance.put(`/Product/${id}`, product);
  return res.data;
};

// DELETE
export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/Product/${id}`);
  return res.data;
};