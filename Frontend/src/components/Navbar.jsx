import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div className="bg-white shadow h-16 flex justify-between items-center px-8">

            <div>

                <h1 className="text-2xl font-bold">
                    RetailPulse AI
                </h1>

                <p className="text-sm text-gray-500">
                    Retail Management Dashboard
                </p>

            </div>

            <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
            >
                Logout
            </button>

        </div>

    );

};

export default Navbar;