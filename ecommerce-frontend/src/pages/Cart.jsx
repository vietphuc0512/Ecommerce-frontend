import { useEffect, useState } from "react";
import { getCart, checkout, removeFromCart } from "../services/cartService";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data);
    } catch {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleCheckout = async () => {
    try {
      await checkout();
      alert("Đặt hàng thành công!");
      loadCart();
      navigate("/orders");
    } catch {
      alert("Đặt hàng thất bại");
    }
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    loadCart();
  };

  const handleBack = () => {
    navigate("/");
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.total,
    0
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Giỏ hàng của bạn
      </h2>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <p className="text-gray-600 mb-6">Giỏ hàng của bạn đang trống.</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Tiếp tục mua sắm
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.productName}
                  </h4>
                  <p className="text-gray-600">
                    Giá: <span className="font-medium">${item.price}</span>
                  </p>
                  <p className="text-gray-600">
                    Số lượng:{" "}
                    <span className="font-medium">{item.quantity}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6">
                  <p className="text-xl font-bold text-blue-600">
                    ${item.total}
                  </p>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Xoá
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Tổng tiền:{" "}
              <span className="text-blue-600">${totalAmount}</span>
            </h3>

            <div className="flex gap-4">
              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
              >
                Đặt hàng
              </button>

              <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Quay lại
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;