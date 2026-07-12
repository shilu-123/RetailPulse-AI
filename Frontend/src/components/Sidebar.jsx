import {
  FaChartPie,
  FaBox,
  FaUsers,
  FaTags,
  FaWarehouse,
  FaFileAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const menu = [

        { name: "Dashboard", icon: <FaChartPie />, path: "/dashboard" },
        { name: "Products", icon: <FaBox />, path: "/products" },
        { name: "Categories", icon: <FaTags />, path: "/categories" },
        { name: "Customers", icon: <FaUsers />, path: "/customers" },
        { name: "Inventory", icon: <FaWarehouse />, path: "/inventory" },
        { name: "Reports", icon: <FaFileAlt />, path: "/reports" }

    ];

    return (

        <div className="w-64 min-h-screen bg-slate-900 text-white">

            <h1 className="text-2xl font-bold text-center py-6 border-b border-slate-700">
                RetailPulse AI
            </h1>

            <div className="mt-5">

                {
                    menu.map(item => (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-6 py-4 transition ${
                                    isActive
                                        ? "bg-blue-600"
                                        : "hover:bg-slate-800"
                                }`
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>

                    ))
                }

            </div>

        </div>

    );

};

export default Sidebar;