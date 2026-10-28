import { NavLink, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Home,
  Upload,
  LogIn,
  UserPlus,
  LogOut,
  Sparkles,
  Flame,
  Clock,
  Heart,
  X,
} from "lucide-react";
import Logo from "./Logo";
import { useToast } from "./Toast";
import { API } from "../utils";

const navGroups = [
  {
    label: "Feed",
    items: [
      { to: "/", icon: Home, label: "Home", sort: "" },
      { to: "/?sort=trending", icon: Flame, label: "Trending", sort: "trending" },
      { to: "/?sort=recent", icon: Clock, label: "Fresh", sort: "recent" },
      { to: "/?sort=liked", icon: Heart, label: "Top liked", sort: "liked" },
    ],
  },
  {
    label: "Studio",
    items: [{ to: "/upload", icon: Upload, label: "Upload" }],
  },
];

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name") || "Creator";

  const isFeedActive = (sort) =>
    location.pathname === "/" && (searchParams.get("sort") || "") === sort;

  async function logoutUser() {
    try {
      await axios.post(
        `${API}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      onClose?.();
      navigate("/login");
      toast.success("Logged out — see you soon!");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed. Please try again.");
    }
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-void-950/70 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[264px] p-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="glass flex h-full flex-col rounded-3xl p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]">
          <div className="mb-5 flex items-center justify-between px-2 pt-1">
            <Logo />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-lg p-1.5 text-mist-400 hover:bg-void-700 hover:text-white lg:hidden"
            >
              <X size={18} />
            </button>
          </div>

          {token && (
            <div className="mb-5 flex items-center gap-3 rounded-2xl bg-void-800/60 p-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-grad font-display font-bold text-void-950">
                {name[0]?.toUpperCase()}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-mist-100">{name}</p>
                <p className="flex items-center gap-1 text-[11px] text-ion-400">
                  <Sparkles size={11} /> Creator mode
                </p>
              </div>
            </div>
          )}

          <nav className="flex-1 space-y-5 overflow-y-auto pr-1">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-1.5 px-3 text-[10px] font-bold tracking-[0.18em] text-mist-500 uppercase">
                  {group.label}
                </p>
                <ul className="space-y-1">
                  {group.items.map(({ to, icon: Icon, label, sort }) => (
                    <li key={label}>
                      <NavLink
                        to={to}
                        onClick={onClose}
                        className={({ isActive }) => {
                          const active =
                            sort !== undefined ? isFeedActive(sort) : isActive;
                          return `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                            active
                              ? "text-white"
                              : "text-mist-400 hover:bg-void-700/60 hover:text-mist-100"
                          }`;
                        }}
                      >
                        {({ isActive }) => {
                          const active =
                            sort !== undefined ? isFeedActive(sort) : isActive;
                          return (
                            <>
                              {active && (
                                <span className="absolute inset-0 rounded-xl bg-grad opacity-15" />
                              )}
                              {active && (
                                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-grad" />
                              )}
                              <Icon
                                size={18}
                                className={`relative ${active ? "text-ion-300" : ""}`}
                              />
                              <span className="relative">{label}</span>
                            </>
                          );
                        }}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="mt-3 space-y-1 border-t border-white/5 pt-3">
            {!token ? (
              <>
                <NavLink
                  to="/login"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-mist-400 transition hover:bg-void-700/60 hover:text-white"
                >
                  <LogIn size={18} /> Sign in
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={onClose}
                  className="btn-primary mx-1 mt-1 w-[calc(100%-0.5rem)] text-sm"
                >
                  <UserPlus size={16} /> Create account
                </NavLink>
              </>
            ) : (
              <button
                onClick={logoutUser}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ember-400 transition hover:bg-ember-500/10"
              >
                <LogOut size={18} /> Sign out
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
