import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        sku: "",
        price: "",
        stock: "",
        categoryId: ""
    });

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {

        try {

            const res = await api.get("/products");

            setProducts(res.data.products);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchCategories = async () => {

        try {

            const res = await api.get("/categories");

            setCategories(res.data.categories);

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

    const editProduct = (product) => {

        setEditingId(product.id);

        setFormData({
            name: product.name,
            sku: product.sku,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId
        });

        setShowModal(true);

    };

    const deleteProduct = async (id) => {

        try {

            await api.delete(`/products/${id}`);

            toast.success("Product Deleted");

            fetchProducts();

        } catch (error) {

            toast.error("Delete Failed");

        }

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId) {

                await api.put(`/products/${editingId}`, formData);

                toast.success("Product Updated");

            } else {

                await api.post("/products", formData);

                toast.success("Product Added");

            }

            setEditingId(null);

            setShowModal(false);

            setFormData({
                name: "",
                sku: "",
                price: "",
                stock: "",
                categoryId: ""
            });

            fetchProducts();

        } catch (error) {

            toast.error(error.response?.data?.message || "Something went wrong");

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
                            Products
                        </h1>

                        <button
                            onClick={() => {
                                setEditingId(null);
                                setFormData({
                                    name: "",
                                    sku: "",
                                    price: "",
                                    stock: "",
                                    categoryId: ""
                                });
                                setShowModal(true);
                            }}
                            className="bg-blue-600 text-white px-5 py-2 rounded"
                        >
                            + Add Product
                        </button>

                    </div>

                    <table className="w-full bg-white shadow rounded">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-3">Name</th>
                                <th className="p-3">SKU</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Stock</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                products.map((product) => (

                                    <tr key={product.id} className="border-b">

                                        <td className="p-3">{product.name}</td>

                                        <td className="p-3">{product.sku}</td>

                                        <td className="p-3">₹ {product.price}</td>

                                        <td className="p-3">{product.stock}</td>

                                        <td className="p-3">
                                            {product.category.name}
                                        </td>

                                        <td className="p-3">

                                            <button
                                                onClick={() => editProduct(product)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteProduct(product.id)}
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
                            className="bg-white w-96 rounded-lg p-6 space-y-4"
                        >

                            <h2 className="text-2xl font-bold">

                                {editingId ? "Edit Product" : "Add Product"}

                            </h2>

                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                className="w-full border p-2 rounded"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="sku"
                                placeholder="SKU"
                                className="w-full border p-2 rounded"
                                value={formData.sku}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                className="w-full border p-2 rounded"
                                value={formData.price}
                                onChange={handleChange}
                            />

                            <input
                                type="number"
                                name="stock"
                                placeholder="Stock"
                                className="w-full border p-2 rounded"
                                value={formData.stock}
                                onChange={handleChange}
                            />

                            <select
                                name="categoryId"
                                className="w-full border p-2 rounded"
                                value={formData.categoryId}
                                onChange={handleChange}
                            >

                                <option value="">Select Category</option>

                                {
                                    categories.map((category) => (

                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>

                                    ))
                                }

                            </select>

                            <div className="flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditingId(null);
                                    }}
                                    className="px-4 py-2 bg-gray-300 rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
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

export default Products;