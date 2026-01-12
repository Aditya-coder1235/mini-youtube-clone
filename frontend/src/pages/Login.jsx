import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    async function loginUser() {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/auth/login",
                formData,
                {withCredentials:true}
            );
            navigate("/");
            alert("user login success full");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.user.role);


        } catch (error) {
            console.error(error)
            alert("Invalid credentials!")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    };

    const handleOnchange = (e) => {
        let { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <div className="min-h-screen bg-[#] flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-[#] p-8 rounded-xl w-96 shadow-lg"
            >
                <h2 className="text-black text-2xl font-semibold text-center mb-6">
                    Login
                </h2>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleOnchange}
                    placeholder="Email"
                    className="w-full mb-4 p-3 rounded-md bg-[#] text-black border border-gray-700 focus:outline-none focus:border-red-600"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleOnchange}
                    placeholder="Password"
                    className="w-full mb-6 p-3 rounded-md bg-[#] text-black border border-gray-700 focus:outline-none focus:border-red-600"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition"
                >
                    Login
                </button>

                <p className="text-gray-400 text-sm text-center mt-4">
                    Not have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-red-500 cursor-pointer hover:underline"
                    >
                        Signup
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
