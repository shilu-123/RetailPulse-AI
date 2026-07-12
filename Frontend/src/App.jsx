import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Customers from "./pages/Customers";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (

        <BrowserRouter>

            <Toaster position="top-right" />

            <Routes>

                {/* Login */}
                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Products */}
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />

                {/* Categories */}
                <Route
                    path="/categories"
                    element={
                        <ProtectedRoute>
                            <Categories />
                        </ProtectedRoute>
                    }
                />

                {/* Customers */}
                <Route
                    path="/customers"
                    element={
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    }
                />

                {/* Inventory */}
                <Route
                    path="/inventory"
                    element={
                        <ProtectedRoute>
                            <Inventory />
                        </ProtectedRoute>
                    }
                />

                {/* Reports */}
                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;