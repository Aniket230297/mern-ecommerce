import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { cartCount } = useCart();

  const navigate = useNavigate();

  const handleLogout = () => {
    setShowMenu(false);
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex justify-between items-center">
          {/* Logo */}

          <Link to="/" className="text-2xl font-bold text-blue-500">
            ShopSphere
          </Link>

          {/* Search */}

          <div className="hidden md:flex w-96">
            <div className="flex w-full border rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && keyword.trim()) {
                    navigate(
                      `/products?keyword=${encodeURIComponent(keyword)}`,
                    );
                    setKeyword("");
                  }
                }}
                className="w-full px-4 py-2 outline-none"
              />

              <button
                onClick={() => {
                  if (keyword.trim()) {
                    navigate(
                      `/products?keyword=${encodeURIComponent(keyword)}`,
                    );
                    setKeyword("");
                  }
                }}
                className="px-4 bg-[#4361EE] hover:bg-[#3A56D4] text-white"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Desktop */}

          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>

            <Link to="/products">Products</Link>

            <Link to="/cart">
              <div className="relative">
                <ShoppingCart size={24} />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {!user ? (
              <div className="flex items-center gap-4">
                <Link to="/login" className="hover:text-blue-600 font-medium">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 border border-black rounded-lg bg-transparent text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="flex items-center gap-2"
                >
                  <FaUser size={18} />
                  <span>{user.name}</span>
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg border">
                    {user.role === "admin" ? (
                      <>
                        <Link
                          to="/admin"
                          onClick={() => setShowMenu(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>

                        <Link
                          to="/admin/products"
                          onClick={() => setShowMenu(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Products
                        </Link>

                        <Link
                          to="/admin/categories"
                          onClick={() => setShowMenu(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Categories
                        </Link>

                        <Link
                          to="/admin/orders"
                          onClick={() => setShowMenu(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Orders
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/profile"
                          onClick={() => setShowMenu(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Profile
                        </Link>

                        <Link
                          to="/orders"
                          onClick={() => setShowMenu(false)}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          My Orders
                        </Link>
                      </>
                    )}

                    <button
                      onClick={() => {
                        setShowMenu(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile */}

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t">
          <div className="p-4 border-b">
            <div className="flex border rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search products..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full px-3 py-2 outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && keyword.trim()) {
                    navigate(
                      `/products?keyword=${encodeURIComponent(keyword)}`,
                    );
                    setKeyword("");
                    setOpen(false);
                  }
                }}
              />

              <button
                onClick={() => {
                  if (keyword.trim()) {
                    navigate(
                      `/products?keyword=${encodeURIComponent(keyword)}`,
                    );
                    setKeyword("");
                    setOpen(false);
                  }
                }}
                className="bg-blue-600 text-white px-4"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
          <Link
            className="block px-4 py-3"
            to="/"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/products"
            className="block px-4 py-3"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>

          <Link
            className="block px-4 py-3"
            to="/cart"
            onClick={() => setOpen(false)}
          >
            Cart ({cartCount})
          </Link>

          {user ? (
            <>
              {user.role === "admin" ? (
                <>
                  <Link
                    className="block px-4 py-3"
                    to="/admin"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    className="block px-4 py-3"
                    to="/admin/products"
                    onClick={() => setOpen(false)}
                  >
                    Products
                  </Link>

                  <Link
                    className="block px-4 py-3"
                    to="/admin/orders"
                    onClick={() => setOpen(false)}
                  >
                    Orders
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="block px-4 py-3"
                    to="/profile"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    className="block px-4 py-3"
                    to="/orders"
                    onClick={() => setOpen(false)}
                  >
                    My Orders
                  </Link>
                </>
              )}

              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="block w-full text-left px-4 py-3 text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="block px-4 py-3"
                to="/login"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                className="block px-4 py-3"
                to="/register"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
