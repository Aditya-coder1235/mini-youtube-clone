import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import AuthShell from "../components/AuthShell";
import { useToast } from "../components/Toast";
import { API } from "../utils";

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPass, setShowPass] = useState(false);
  const [busy, setBusy] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function signupUser() {
    setBusy(true);
    try {
      await axios.post(`${API}/api/auth/signup`, formData);
      toast.success("Account created — go ahead and sign in!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser();
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const fields = [
    {
      id: "name",
      label: "Username",
      type: "text",
      icon: User,
      placeholder: "Your display name",
      autoComplete: "name",
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      icon: Mail,
      placeholder: "you@example.com",
      autoComplete: "email",
    },
    {
      id: "password",
      label: "Password",
      type: showPass ? "text" : "password",
      icon: Lock,
      placeholder: "At least 6 characters",
      autoComplete: "new-password",
    },
  ];

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start uploading and building your audience today."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-plasma-300 hover:text-plasma-200">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map(({ id, label, type, icon: Icon, placeholder, autoComplete }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="mb-1.5 block text-xs font-semibold tracking-wide text-mist-400 uppercase"
            >
              {label}
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-mist-500">
                <Icon size={16} />
              </span>
              <input
                id={id}
                type={type}
                name={id}
                autoComplete={autoComplete}
                value={formData[id]}
                onChange={handleOnchange}
                placeholder={placeholder}
                className={`input-field ${id === "password" ? "pr-11 pl-11" : "pl-11"}`}
                required
              />
              {id === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  aria-label={showPass ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-mist-500 transition hover:text-mist-200"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={busy}
          className="btn-primary h-12 w-full disabled:opacity-60"
        >
          {busy ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Creating account…
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>
    </AuthShell>
  );
};

export default Signup;
