import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Search, Menu, Upload, Bell, X } from "lucide-react";
import Logo from "./Logo";

const NavBar = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(urlQuery);
  const [lastUrlQuery, setLastUrlQuery] = useState(urlQuery);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);
  const token = localStorage.getItem("token");

  if (urlQuery !== lastUrlQuery) {
    setLastUrlQuery(urlQuery);
    setQuery(urlQuery);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") inputRef.current?.blur();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/?q=${encodeURIComponent(q)}` : "/");
    inputRef.current?.blur();
  };

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "glass-strong shadow-[0_12px_40px_-16px_rgba(0,0,0,0.9)]"
          : "bg-void-950/60 backdrop-blur-md"
      }`}
    >
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          onClick={onMenuToggle}
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-xl text-mist-300 transition hover:bg-void-700 hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        <Link to="/" className="shrink-0 lg:hidden">
          <span className="hidden sm:block">
            <Logo />
          </span>
          <span className="sm:hidden">
            <Logo size={30} />
          </span>
        </Link>

        <form onSubmit={submitSearch} className="mx-auto w-full max-w-xl">
          <div className="group relative flex items-center">
            <span className="pointer-events-none absolute left-4 text-mist-500 transition-colors group-focus-within:text-plasma-400">
              <Search size={17} />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos…"
              aria-label="Search videos"
              className="input-field h-11 w-full rounded-full pr-20 pl-11"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  navigate("/");
                }}
                aria-label="Clear search"
                className="absolute right-4 text-mist-500 hover:text-white"
              >
                <X size={16} />
              </button>
            ) : (
              <kbd className="pointer-events-none absolute right-3 hidden rounded-md border border-white/10 bg-void-700/70 px-2 py-0.5 font-sans text-[11px] text-mist-500 sm:block">
                Ctrl K
              </kbd>
            )}
          </div>
        </form>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            aria-label="Notifications"
            className="relative hidden h-10 w-10 place-items-center rounded-xl text-mist-300 transition hover:bg-void-700 hover:text-white sm:grid"
          >
            <Bell size={18} />
            <span className="absolute top-2 right-2.5 h-1.5 w-1.5 rounded-full bg-ember-400 shadow-[0_0_8px_2px_rgba(255,77,109,0.8)]" />
          </button>

          {token ? (
            <Link to="/upload" className="btn-primary h-10 px-4 text-sm">
              <Upload size={16} />
              <span className="hidden md:inline">Upload</span>
            </Link>
          ) : (
            <Link to="/login" className="btn-primary h-10 px-4 text-sm">
              Sign in
            </Link>
          )}
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-plasma-500/40 to-transparent" />
    </header>
  );
};

export default NavBar;
