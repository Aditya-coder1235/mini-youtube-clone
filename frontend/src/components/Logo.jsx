const Logo = ({ size = 34 }) => (
  <span className="flex items-center gap-2.5 select-none">
    <span
      className="relative grid place-items-center rounded-[11px] bg-grad shadow-[0_8px_24px_-8px_rgba(124,92,255,0.8)]"
      style={{ width: size, height: size }}
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 6.5v11l9.5-5.5L9 6.5z"
          fill="#06060b"
          stroke="#06060b"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-ion-400 shadow-[0_0_8px_2px_rgba(61,214,237,0.9)]" />
    </span>
    <span className="font-display text-[1.35rem] font-bold tracking-tight leading-none">
      Pulsar<span className="text-grad">TV</span>
    </span>
  </span>
);

export default Logo;
