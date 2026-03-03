import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await getProducts();
    setProducts(data);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      imageUrl: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
    };

    if (editingId) {
      await updateProduct(editingId, payload);
    } else {
      await createProduct(payload);
    }

    resetForm();
    loadProducts();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Xoá sản phẩm này?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Quản lý sản phẩm
      </h2>

      <form
  onSubmit={handleSubmit}
  className="grid grid-cols-1 md:grid-cols-2 gap-6"
>
  {/* Tên sản phẩm */}
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">
      Tên sản phẩm
    </label>
    <input
      name="name"
      value={form.name}
      onChange={handleChange}
      required
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Giá */}
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">
      Giá ($)
    </label>
    <input
      name="price"
      type="number"
      value={form.price}
      onChange={handleChange}
      required
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Số lượng */}
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">
      Số lượng trong kho
    </label>
    <input
      name="stock"
      type="number"
      value={form.stock}
      onChange={handleChange}
      required
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Image URL */}
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">
      Link hình ảnh (Image URL)
    </label>
    <input
      name="imageUrl"
      value={form.imageUrl}
      onChange={handleChange}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Mô tả */}
  <div className="flex flex-col md:col-span-2">
    <label className="mb-1 font-medium text-gray-700">
      Mô tả sản phẩm
    </label>
    <textarea
      name="description"
      value={form.description}
      onChange={handleChange}
      required
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div className="md:col-span-2 flex gap-4">
    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
    >
      {editingId ? "Cập nhật" : "Thêm sản phẩm"}
    </button>

    {editingId && (
      <button
        type="button"
        onClick={resetForm}
        className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition"
      >
        Huỷ
      </button>
    )}
  </div>
</form>

      {/* PRODUCT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col"
          >
            <div className="flex-1">
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-40 object-contain mx-auto mb-4"
                />
              ) : (
                <div className="h-40 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              <h4 className="text-lg font-bold text-gray-800 mb-2">
                {p.name}
              </h4>

              <p className="text-blue-600 font-semibold mb-2">
                ${p.price}
              </p>

              <p className="text-sm text-gray-500 mb-3">
                Stock: {p.stock}
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
              >
                Sửa
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Xoá
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductManager;