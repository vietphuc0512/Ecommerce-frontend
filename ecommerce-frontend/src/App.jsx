import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail";
import OrderHistory from "./pages/OrderHistory";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <Navbar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Home token={token} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        <Route
          path="/cart"
          element={
            <PrivateRoute token={token}>
              <Cart />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <PrivateRoute token={token}>
              <OrderHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;