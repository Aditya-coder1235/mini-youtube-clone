import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "./ErrorPage";
import Videoupload from "./pages/Videoupload";
import VideoById from "./components/VideoById";

const App = () => {
    return (
        <div className="">
            <NavBar />
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/upload" element={<Videoupload />}></Route>
                </Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="*" element={<ErrorPage />}></Route>
                <Route path="/video/:id" element={<VideoById/>}></Route>
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
