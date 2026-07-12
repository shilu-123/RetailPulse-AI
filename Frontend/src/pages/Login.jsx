import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Login = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await api.post("/auth/login", formData);

            localStorage.setItem("token", res.data.token);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            toast.error(error.response?.data?.message || "Login Failed");

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg w-96"
            >

                <h2 className="text-3xl font-bold text-center mb-6">
                    RetailPulse AI
                </h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-3 rounded mb-4"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-3 rounded mb-4"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button
                    className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                    Login
                </button>

            </form>

        </div>

    );

};

export default Login;