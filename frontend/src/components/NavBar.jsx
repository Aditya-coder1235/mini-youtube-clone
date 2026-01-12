import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";

const NavBar = () => {
    const navigate = useNavigate();

    async function logoutUser() {
        try {
            await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true }
            );

            localStorage.removeItem("token");
            localStorage.removeItem("role");

            navigate("/login");
            alert("Logged out successfully");
        } catch (error) {
            console.error(error);
            alert("Logout failed. Please try again.");
        }
    }

    return (
        <nav className="sticky top-0 z-50 bg-white  shadow-sm">
            <div className="flex items-center justify-between px-6 py-2">
                <Link to="/" className="flex items-center gap-2">
                    <img src="/youtube.png" alt="YouTube" className="h-13" />
                </Link>

                <div className="flex items-center w-[40%]">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/upload"
                        className="px-4 py-2 border rounded-full hover:bg-gray-100 font-medium"
                    >
                        Upload
                    </Link>

                    <Link
                        to="/signup"
                        className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        Signup
                    </Link>

                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                        Login
                    </Link>

                    <button
                        onClick={logoutUser}
                        className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
