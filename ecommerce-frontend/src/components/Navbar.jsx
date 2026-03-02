import { Link } from "react-router-dom";

function Navbar({ token, setToken }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          MyShop
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <Link 
            to="/" 
            className="hover:text-blue-600 transition"
          >
            Trang chủ
          </Link>

          <Link 
            to="/cart" 
            className="hover:text-blue-600 transition"
          >
            Giỏ hàng
          </Link>

          {token && (
            <Link 
              to="/orders" 
              className="hover:text-blue-600 transition"
            >
              Đơn hàng
            </Link>
          )}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Đăng xuất
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Đăng nhập
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
              >
                Đăng ký
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;