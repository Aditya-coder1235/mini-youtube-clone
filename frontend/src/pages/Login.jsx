import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import AuthShell from "../components/AuthShell";
import { useToast } from "../components/Toast";
import { API } from "../utils";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  async function loginUser() {
    setBusy(true);
    try {
      const res = await axios.post(`${API}/api/auth/login`, formData, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid credentials!");
    } finally {
      setBusy(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue watching and uploading."
      footer={
        <>
          New here?{" "}
          <Link to="/signup" className="font-semibold text-plasma-300 hover:text-plasma-200">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-semibold tracking-wide text-mist-400 uppercase"
          >
            Email
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-mist-500">
              <Mail size={16} />
            </span>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleOnchange}
              placeholder="you@example.com"
              className="input-field pl-11"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-xs font-semibold tracking-wide text-mist-400 uppercase"
          >
            Password
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-mist-500">
              <Lock size={16} />
            </span>
            <input
              id="password"
              type={showPass ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleOnchange}
              placeholder="••••••••"
              className="input-field pr-11 pl-11"
              required
            />
            <button
              type="button"
              onClick={() => setShowPass((s) => !s)}
              aria-label={showPass ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-mist-500 transition hover:text-mist-200"
            >
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={busy}
          className="btn-primary h-12 w-full disabled:opacity-60"
        >
          {busy ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </form>
    </AuthShell>
  );
};

export default Login;
