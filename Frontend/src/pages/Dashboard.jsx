import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

import {
  FaBox,
  FaUsers,
  FaTags,
  FaExclamationTriangle
} from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalCategories: 0,
    lowStockProducts: 0
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchProducts();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const barData = {
    labels: ["Products", "Customers", "Categories", "Low Stock"],
    datasets: [
      {
        label: "Dashboard Stats",
        data: [
          stats.totalProducts,
          stats.totalCustomers,
          stats.totalCategories,
          stats.lowStockProducts
        ],
        backgroundColor: ["#2563EB", "#10B981", "#8B5CF6", "#DC2626"],
        borderRadius: 6
      }
    ]
  };

  const pieData = {
    labels: ["Products", "Customers", "Categories"],
    datasets: [
      {
        data: [
          stats.totalProducts,
          stats.totalCustomers,
          stats.totalCategories
        ],
        backgroundColor: ["#2563EB", "#10B981", "#8B5CF6"],
        borderColor: "#ffffff",
        borderWidth: 3,
        hoverOffset: 20
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1200
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20
        }
      }
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Products</p>
                  <h2 className="text-4xl font-bold mt-2">{stats.totalProducts}</h2>
                </div>
                <FaBox className="text-4xl text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Customers</p>
                  <h2 className="text-4xl font-bold mt-2">{stats.totalCustomers}</h2>
                </div>
                <FaUsers className="text-4xl text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Categories</p>
                  <h2 className="text-4xl font-bold mt-2">{stats.totalCategories}</h2>
                </div>
                <FaTags className="text-4xl text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-600">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">Low Stock</p>
                  <h2 className="text-4xl font-bold mt-2 text-red-600">
                    {stats.lowStockProducts}
                  </h2>
                </div>
                <FaExclamationTriangle className="text-4xl text-red-600" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-lg shadow p-6 h-[350px]">
              <h2 className="text-xl font-bold mb-5">Overview Chart</h2>
              <Bar data={barData} options={chartOptions} />
            </div>

            <div className="bg-white rounded-lg shadow p-6 h-[350px]">
              <h2 className="text-xl font-bold mb-5">Distribution</h2>
              <Doughnut data={pieData} options={chartOptions} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-5">Recent Products</h2>

            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Stock</th>
                </tr>
              </thead>

              <tbody>
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="border-b">
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">₹ {product.price}</td>
                    <td className="p-3">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;