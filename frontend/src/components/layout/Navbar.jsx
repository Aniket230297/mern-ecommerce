import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

const handleLogout = () => {
    setShowMenu(false);
    logout();
    navigate("/login");
};  

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex justify-between items-center">
          {/* Logo */}

          <Link to="/" className="text-2xl font-bold text-blue-600">
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
                className="px-4 bg-blue-600 text-white"
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Desktop */}

          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>

            <Link to="/cart">
              <ShoppingCart />
            </Link>

            {!user ? (
              <Link to="/login">
                <FaUser size={20} />
              </Link>
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
            className="block px-4 py-3"
            to="/cart"
            onClick={() => setOpen(false)}
          >
            Cart
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
            <Link className="block px-4 py-3" to="/login">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
