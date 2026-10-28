import Logo from "./Logo";

const Footer = () => (
  <footer className="mt-16 border-t border-white/5 bg-void-900/60">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Logo size={30} />
          <p className="max-w-xs text-center text-sm text-mist-500 md:text-left">
            A next-gen space for creators to stream, share and grow — built for
            the people behind the play button.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-mist-400">
          {["About", "Press", "Privacy", "Terms", "Creators", "Contact"].map(
            (item) => (
              <span
                key={item}
                className="cursor-pointer transition-colors hover:text-ion-400"
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 border-t border-white/5 pt-6 text-xs text-mist-500 sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} PulsarTV. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ion-400 animate-pulse-soft" />
          All systems operational
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
