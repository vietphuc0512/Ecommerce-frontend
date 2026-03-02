import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Login({ setToken }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(form);

      localStorage.setItem("token", data.token);
      setToken(data.token);

      alert("Login thành công!");
      navigate("/");
    } catch (err) {
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Đăng nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Nhập email của bạn"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="Nhập mật khẩu"
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Bạn chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;