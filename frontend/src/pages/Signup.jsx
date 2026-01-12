import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    async function signupUser() {
        try {
            let res = await axios.post(
                "http://localhost:8080/api/auth/signup",
                formData
            );
            alert("User signup successful");
            navigate("/login");
        } catch (error) {
            alert("All fields are required");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        signupUser();
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
                    Create your account
                </h2>

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleOnchange}
                    placeholder="Username"
                    className="w-full mb-4 p-3 rounded-md bg-[#] text-black border border-gray-700 focus:outline-none focus:border-red-600"
                    required
                />

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
                    Sign Up
                </button>

                <p className="text-gray-400 text-sm text-center mt-4">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-red-500 cursor-pointer hover:underline"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
