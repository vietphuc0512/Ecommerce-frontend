import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch {
      alert("Không load được sản phẩm");
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (quantity <= 0) {
      alert("Số lượng phải lớn hơn 0");
      return;
    }

    if (quantity > product.stock) {
      alert("Không đủ hàng trong kho");
      return;
    }

    try {
      await addToCart({
        productId: product.id,
        quantity: quantity,
      });

      alert("Thêm vào giỏ hàng thành công!");
      loadProduct();
      setQuantity(1);
    } catch {
      alert("Thêm vào giỏ thất bại");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button
        onClick={handleBack}
        className="mb-6 text-gray-600 hover:text-gray-800 transition"
      >
        ← Quay lại
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center">
          {product.imageUrl ? (
  <img
    src={product.imageUrl}
    alt={product.name}
    className="max-h-96 object-contain"
  />
) : (
  <div className="text-gray-400">No Image</div>
)}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h2>

            <p className="text-2xl font-bold text-blue-600 mb-3">
              ${product.price}
            </p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
                product.stock > 0
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0
                ? `Còn lại: ${product.stock}`
                : "Hết hàng"}
            </span>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          {/* Action */}
          {product.stock > 0 && (
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) =>
                  setQuantity(Number(e.target.value))
                }
                className="w-20 border border-gray-300 rounded-lg px-3 py-2 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Thêm vào giỏ
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;