import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../services/api";
import toast from "react-hot-toast";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [name, setName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(res.data.categories);

        } catch (error) {

            console.log(error);

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await api.put(`/categories/${editingId}`, {
                    name
                });

                toast.success("Category Updated");

            } else {

                await api.post("/categories", {
                    name
                });

                toast.success("Category Added");

            }

            setName("");
            setEditingId(null);
            setShowModal(false);

            fetchCategories();

        } catch (error) {

            toast.error(error.response?.data?.message || "Error");

        }

    };

    const editCategory = (category) => {

        setEditingId(category.id);

        setName(category.name);

        setShowModal(true);

    };

    const deleteCategory = async (id) => {

        try {

            await api.delete(`/categories/${id}`);

            toast.success("Category Deleted");

            fetchCategories();

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
                            Categories
                        </h1>

                        <button
                            onClick={() => {
                                setEditingId(null);
                                setName("");
                                setShowModal(true);
                            }}
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            + Add Category
                        </button>

                    </div>

                    <table className="w-full bg-white shadow rounded">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-3">ID</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                categories.map(category => (

                                    <tr key={category.id} className="border-b">

                                        <td className="p-3">{category.id}</td>

                                        <td className="p-3">{category.name}</td>

                                        <td className="p-3">

                                            <button
                                                onClick={() => editCategory(category)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteCategory(category.id)}
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

                                {editingId ? "Edit Category" : "Add Category"}

                            </h2>

                            <input
                                type="text"
                                placeholder="Category Name"
                                className="w-full border p-2 rounded"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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

export default Categories;