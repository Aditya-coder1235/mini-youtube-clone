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
        <nav
            className="  "
            // style={{ backgroundColor: "#303030" }}
        >
            <div className="flex items-center justify-between px-6 py-2">
                <Link to="/" className="flex items-center gap-2">
                    <img
                        src="/youtubeClone.png"
                        alt="YouTube"
                        className="h-18"
                    />
                </Link>

                <div className="relative w-full md:w-[40%]">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search"
                        className="
            w-full
            h-10
            pl-12
            pr-4
            py-2
            border
            rounded-full
            focus:outline-none
            focus:ring-1
            focus:ring-gray-400
        "
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        to="/upload"
                        className="px-4 py-2  rounded-full h-10 hover:text-black hover:bg-gray-100 font-medium"
                    >
                        Upload
                    </Link>

                    <Link
                        to="/signup"
                        className="px-4 py-2 rounded-full h-10 hover:text-black hover:bg-gray-100 font-medium"
                    >
                        Signup
                    </Link>

                    <Link
                        to="/login"
                        className="px-4 py-2 rounded-full h-10 hover:text-black hover:bg-gray-100 font-medium"
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
