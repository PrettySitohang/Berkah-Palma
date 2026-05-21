import { BiListOl, BiCog, BiLogOut, BiHeart, BiCart } from "react-icons/bi";
import { RiDashboardFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Styling menu yang lebih clean sesuai branding Berkah Palma
  const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 transition-all duration-300 group
     ${
       isActive
         ? "text-green-700 bg-green-50 font-extrabold"
         : "text-gray-400 hover:text-green-600 hover:bg-gray-50 font-medium"
     }`;

  return (
    <div id="sidebar" className="flex flex-col h-full p-6 bg-white border-r border-gray-100">
      
      {/* Navigation Section */}
      <div id="sidebar-menu" className="flex-1 overflow-y-auto">
        <p className="text-[11px] font-bold text-gray-300 uppercase mb-6 tracking-widest">Navigation</p>
        
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard" className={menuClass}>
              <RiDashboardFill className="mr-4 text-2xl" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/order-history" className={menuClass}>
              <BiListOl className="mr-4 text-2xl" />
              Order History
            </NavLink>
          </li>
          <li>
            <NavLink to="/wishlist" className={menuClass}>
              <BiHeart className="mr-4 text-2xl" />
              Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink to="/shopping-cart" className={menuClass}>
              <BiCart className="mr-4 text-2xl" />
              Shopping Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={menuClass}>
              <BiCog className="mr-4 text-2xl" />
              Settings
            </NavLink>
          </li>
          <li>
            <button className="w-full flex items-center rounded-xl p-4 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all duration-300 font-medium">
              <BiLogOut className="mr-4 text-2xl" />
              Log-out
            </button>
          </li>
        </ul>
      </div>

      {/* Footer Sidebar / Branding Section */}
      <div id="sidebar-footer" className="mt-auto pt-6 border-t border-gray-50">
        <div className="text-[11px]">
          <span className="block font-bold text-gray-700 uppercase tracking-tighter">
            Berkah <span className="text-green-600">Palma</span>
          </span>
          <p className="text-gray-400">© 2026 Management System</p>
        </div>
      </div>
    </div>
  );
}