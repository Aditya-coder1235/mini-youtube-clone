import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "./ErrorPage";
import Videoupload from "./pages/Videoupload";
import VideoById from "./components/VideoById";

const App = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="relative min-h-screen bg-void-950">
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
            >
                <div className="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-plasma-500/16 blur-[130px]" />
                <div className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full bg-ion-500/12 blur-[130px]" />
                <div className="absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-ember-500/8 blur-[130px]" />
            </div>

            <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

            <div className="lg:pl-[272px]">
                <NavBar onMenuToggle={() => setMenuOpen((o) => !o)} />
                <main className="mx-auto w-full max-w-[1600px] px-4 sm:px-6">
                    <Routes>
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/upload" element={<Videoupload />} />
                        </Route>
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/video/:id" element={<VideoById />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;
