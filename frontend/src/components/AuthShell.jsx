import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";
import Logo from "./Logo";

const AuthShell = ({ title, subtitle, footer, children }) => (
  <div className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
    <div className="hidden lg:flex lg:flex-col lg:justify-center">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ion-400/30 bg-ion-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-ion-300 uppercase">
        <Sparkles size={12} /> Join the broadcast
      </span>
      <h1 className="mt-5 font-display text-4xl leading-tight font-bold text-white xl:text-5xl">
        Your audience is already <span className="text-grad">scrolling</span>.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-mist-400 xl:text-base">
        Sign in to upload, like and comment — or create a free account and start
        your own channel in seconds.
      </p>

      <div className="mt-8 grid max-w-md gap-3">
        {[
          { icon: Zap, text: "Instant uploads with auto-generated thumbnails" },
          { icon: ShieldCheck, text: "Secure session with encrypted cookies" },
          { icon: Sparkles, text: "Clean, dark UI built for long watch sessions" },
        ].map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="glass flex items-center gap-3 rounded-2xl px-4 py-3"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-grad text-void-950">
              <Icon size={16} />
            </span>
            <p className="text-sm text-mist-300">{text}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="relative mx-auto w-full max-w-md">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-plasma-500/25 blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-10 h-56 w-56 rounded-full bg-ion-500/20 blur-[80px]"
      />

      <div className="glass-strong relative rounded-3xl p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] sm:p-9">
        <Link to="/" className="inline-flex lg:hidden">
          <Logo size={30} />
        </Link>

        <h2 className="mt-5 font-display text-2xl font-bold text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-1.5 text-sm text-mist-500">{subtitle}</p>

        <div className="mt-7">{children}</div>

        <div className="mt-6 border-t border-white/6 pt-5 text-center text-sm text-mist-400">
          {footer}
        </div>
      </div>
    </div>
  </div>
);

export default AuthShell;
