import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import toast from "react-hot-toast";

const Customers = () => {

    const [customers, setCustomers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {

        try {

            const res = await api.get("/customers");

            setCustomers(res.data.customers);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await api.put(`/customers/${editingId}`, formData);

                toast.success("Customer Updated");

            } else {

                await api.post("/customers", formData);

                toast.success("Customer Added");

            }

            setEditingId(null);

            setShowModal(false);

            setFormData({
                name: "",
                email: "",
                phone: ""
            });

            fetchCustomers();

        } catch (error) {

            toast.error(error.response?.data?.message || "Error");

        }

    };

    const editCustomer = (customer) => {

        setEditingId(customer.id);

        setFormData({
            name: customer.name,
            email: customer.email,
            phone: customer.phone
        });

        setShowModal(true);

    };

    const deleteCustomer = async (id) => {

        try {

            await api.delete(`/customers/${id}`);

            toast.success("Customer Deleted");

            fetchCustomers();

        } catch (error) {

            toast.error("Delete Failed");

        }

    };

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <div className="p-8">

                    <div className="flex justify-between mb-6">

                        <h1 className="text-3xl font-bold">
                            Customers
                        </h1>

                        <button
                            onClick={() => {
                                setEditingId(null);
                                setFormData({
                                    name: "",
                                    email: "",
                                    phone: ""
                                });
                                setShowModal(true);
                            }}
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            + Add Customer
                        </button>

                    </div>

                    <table className="w-full bg-white shadow rounded">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Phone</th>
                                <th className="p-3">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                customers.map(customer => (

                                    <tr key={customer.id} className="border-b">

                                        <td className="p-3">{customer.name}</td>

                                        <td className="p-3">{customer.email}</td>

                                        <td className="p-3">{customer.phone}</td>

                                        <td className="p-3">

                                            <button
                                                onClick={() => editCustomer(customer)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteCustomer(customer.id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {
                showModal && (

                    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

                        <form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded-lg w-96 space-y-4"
                        >

                            <h2 className="text-2xl font-bold">

                                {editingId ? "Edit Customer" : "Add Customer"}

                            </h2>

                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="w-full border p-2 rounded"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="w-full border p-2 rounded"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                className="w-full border p-2 rounded"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    {editingId ? "Update" : "Save"}
                                </button>

                            </div>

                        </form>

                    </div>

                )
            }

        </div>

    );

};

export default Customers;