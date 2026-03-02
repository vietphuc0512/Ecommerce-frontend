import { useEffect, useState } from "react";
import { getOrders } from "../services/orderService";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
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
        Lịch sử đơn hàng
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <p className="text-gray-600">
            Không có đơn hàng nào.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <p className="text-gray-500 text-sm">
                  Order ID
                </p>
                <p className="font-semibold text-gray-800">
                  #{order.id}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Tổng tiền
                </p>
                <p className="text-lg font-bold text-blue-600">
                  ${order.totalAmount}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;