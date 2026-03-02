import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7079/api/Order/my-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setOrders(res.data);
      } catch (err) {
        console.log(err);
        alert("Không load được đơn hàng");
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Đơn hàng của bạn
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <p className="text-gray-600">
            Bạn chưa có đơn hàng nào.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              {/* Order Header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 border-b pb-4 mb-4">
                <div>
                  <p className="text-gray-500 text-sm">
                    Mã đơn hàng
                  </p>
                  <p className="font-semibold text-gray-800">
                    #{order.id}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Ngày đặt
                  </p>
                  <p className="font-medium text-gray-700">
                    {new Date(order.orderDate).toLocaleString()}
                  </p>
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Tổng tiền
                  </p>
                  <p className="text-xl font-bold text-blue-600">
                    {order.totalAmount.toLocaleString()} đ
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 flex flex-col md:flex-row md:justify-between md:items-center gap-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.productName}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Số lượng: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-600 text-sm">
                        Giá: {item.price.toLocaleString()} đ
                      </p>
                      <p className="font-semibold text-gray-800">
                        Thành tiền:{" "}
                        {(item.price * item.quantity).toLocaleString()} đ
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;