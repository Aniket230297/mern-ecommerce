import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  List,
  ShoppingBag,
} from "lucide-react";

function AdminSidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5">

      <h2 className="text-2xl font-bold mb-8">
        Admin Panel
      </h2>

      <nav className="space-y-2">

        <NavLink
          to="/admin"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
        >
          <Package size={20} />
          Products
        </NavLink>

        <NavLink
          to="/admin/categories"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
        >
          <List size={20} />
          Categories
        </NavLink>

        <NavLink
          to="/admin/orders"
          className="flex items-center gap-3 p-3 rounded hover:bg-gray-800"
        >
          <ShoppingBag size={20} />
          Orders
        </NavLink>

      </nav>
    </aside>
  );
}

export default AdminSidebar;