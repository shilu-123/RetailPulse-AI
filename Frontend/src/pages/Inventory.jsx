import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import toast from "react-hot-toast";

const Inventory = () => {

    const [inventory, setInventory] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [stock, setStock] = useState("");

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {

        try {

            const res = await api.get("/inventory");

            setInventory(res.data.inventory);

        } catch (error) {

            console.log(error);

        }

    };

    const updateStock = async (id) => {

        try {

            await api.put(`/inventory/${id}`, {
                stock: Number(stock)
            });

            toast.success("Stock Updated");

            setEditingId(null);

            setStock("");

            fetchInventory();

        } catch (error) {

            toast.error("Update Failed");

        }

    };

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-8">

                    <h1 className="text-3xl font-bold mb-6">
                        Inventory
                    </h1>

                    <table className="w-full bg-white shadow rounded">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-3">Product</th>
                                <th className="p-3">SKU</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                inventory.map(item => (

                                    <tr key={item.id} className="border-b">

                                        <td className="p-3">{item.name}</td>

                                        <td className="p-3">{item.sku}</td>

                                        <td className="p-3">

                                            {
                                                editingId === item.id ?

                                                    <input
                                                        type="number"
                                                        value={stock}
                                                        onChange={(e) => setStock(e.target.value)}
                                                        className="border p-2 rounded w-20"
                                                    />

                                                    :

                                                    item.stock

                                            }

                                        </td>

                                        <td className="p-3">

                                            {item.category.name}

                                        </td>

                                        <td className="p-3">

                                            {
                                                editingId === item.id ?

                                                    <button
                                                        onClick={() => updateStock(item.id)}
                                                        className="bg-green-600 text-white px-3 py-1 rounded"
                                                    >
                                                        Save
                                                    </button>

                                                    :

                                                    <button
                                                        onClick={() => {
                                                            setEditingId(item.id);
                                                            setStock(item.stock);
                                                        }}
                                                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                                                    >
                                                        Update
                                                    </button>

                                            }

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

};

export default Inventory;