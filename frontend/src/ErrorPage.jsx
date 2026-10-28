import { Link } from "react-router-dom";
import { Compass, Home, Upload } from "lucide-react";
import Logo from "./components/Logo";

const ErrorPage = () => (
  <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-16 text-center">
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 rounded-full bg-plasma-500/20 blur-[70px]"
      />
      <span className="relative grid h-20 w-20 place-items-center rounded-3xl bg-grad shadow-[0_20px_50px_-16px_rgba(124,92,255,0.9)] animate-floaty">
        <Compass size={34} className="text-void-950" />
      </span>
    </div>

    <p className="mt-8 font-display text-7xl font-bold text-grad sm:text-8xl">404</p>
    <h1 className="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">
      This page drifted off-screen
    </h1>
    <p className="mt-2 max-w-md text-sm leading-relaxed text-mist-500">
      The link may be broken or the video was removed. Let's get you back to
      something worth watching.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-3">
      <Link to="/" className="btn-primary">
        <Home size={16} /> Back to home
      </Link>
      <Link to="/upload" className="btn-ghost">
        <Upload size={16} /> Upload instead
      </Link>
    </div>

    <Link to="/" className="mt-10 opacity-70 transition hover:opacity-100">
      <Logo size={28} />
    </Link>
  </div>
);

export default ErrorPage;
