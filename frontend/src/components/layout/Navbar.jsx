import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
} from "lucide-react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">

        <div className="h-16 flex justify-between items-center">

          {/* Logo */}

          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            ShopSphere
          </Link>

          {/* Search */}

          <div className="hidden md:flex w-96">

            <div className="flex w-full border rounded-lg overflow-hidden">

              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 outline-none"
              />

              <button className="px-4 bg-blue-600 text-white">

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

            <Link to="/profile">
              <User />
            </Link>

          </div>

          {/* Mobile */}

          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>

        </div>

      </div>

      {open && (

        <div className="md:hidden border-t">

          <Link
            className="block px-4 py-3"
            to="/"
          >
            Home
          </Link>

          <Link
            className="block px-4 py-3"
            to="/cart"
          >
            Cart
          </Link>

          <Link
            className="block px-4 py-3"
            to="/profile"
          >
            Profile
          </Link>

        </div>

      )}
    </nav>
  );
}

export default Navbar;