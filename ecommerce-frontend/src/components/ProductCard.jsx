import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../services/cartService";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const goToDetail = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      const confirmLogin = window.confirm(
        "Bạn cần đăng nhập để thêm vào giỏ hàng. Chuyển đến trang đăng nhập?"
      );

      if (confirmLogin) {
        navigate("/login");
      }
      return;
    }

    if (quantity < 1) {
      alert("Số lượng phải >= 1");
      return;
    }

    if (quantity > product.stock) {
      alert("Số lượng vượt quá stock");
      return;
    }

    try {
      await addToCart({
        productId: product.id,
        quantity: quantity,
      });

      alert("Đã thêm vào giỏ hàng");
      setQuantity(1);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("Có lỗi xảy ra");
      }
    }
  };

  return (
  <div
    onClick={goToDetail}
    className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 cursor-pointer flex flex-col justify-between"
  >
    {/* Product Image */}
    <div className="mb-4">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-xl"
      />
    </div>

    {/* Product Info */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
        {product.name}
      </h3>

      <p className="text-blue-600 font-bold text-xl mb-2">
        ${product.price}
      </p>

      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {product.description}
      </p>

      <span className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mb-4">
        Còn lại: {product.stock}
      </span>
    </div>

    {/* Action Section */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-3 mt-3"
    >
      <input
        type="number"
        min="1"
        max={product.stock}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleAddToCart}
        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Thêm vào giỏ
      </button>
    </div>
  </div>
);
}

export default ProductCard;