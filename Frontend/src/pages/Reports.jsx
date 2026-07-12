import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";

const Reports = () => {

    const [report, setReport] = useState({
        totalProducts: 0,
        totalCustomers: 0,
        totalCategories: 0,
        lowStockProducts: 0,
        inventoryValue: 0
    });

    useEffect(() => {
        fetchReport();
    }, []);

    const fetchReport = async () => {

        try {

            const res = await api.get("/reports");

            setReport(res.data.report);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-3xl font-bold mb-8">
                        Business Report
                    </h1>

                    <div className="grid grid-cols-2 gap-6">

                        <div className="bg-white shadow rounded-lg p-6">
                            <h3>Total Products</h3>
                            <p className="text-3xl font-bold mt-2">
                                {report.totalProducts}
                            </p>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h3>Total Customers</h3>
                            <p className="text-3xl font-bold mt-2">
                                {report.totalCustomers}
                            </p>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h3>Total Categories</h3>
                            <p className="text-3xl font-bold mt-2">
                                {report.totalCategories}
                            </p>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <h3>Low Stock Products</h3>
                            <p className="text-3xl font-bold mt-2 text-red-600">
                                {report.lowStockProducts}
                            </p>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6 col-span-2">
                            <h3>Total Inventory Value</h3>
                            <p className="text-4xl font-bold mt-3 text-green-600">
                                ₹ {report.inventoryValue}
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default Reports;