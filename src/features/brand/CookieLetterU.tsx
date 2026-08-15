/** Cookie-shaped letter U for Lamsumsum wordmark. */
export function CookieLetterU({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cookieDough" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#fff6ea" />
          <stop offset="45%" stopColor="#f4ead8" />
          <stop offset="100%" stopColor="#e2c9a4" />
        </radialGradient>
        <radialGradient id="chipShine" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#6b4030" />
          <stop offset="100%" stopColor="#3f2115" />
        </radialGradient>
      </defs>

      {/* Soft drop so the cookie pops off the plate */}
      <ellipse cx="18.4" cy="20.2" fill="#5d3a3a" opacity="0.22" rx="13.2" ry="12.4" />

      {/* Dough body with bite cut from the top-right */}
      <path
        d="M18 4.2
           C11.1 4.2 5.6 9.5 5.6 16.6
           C5.6 24.2 11.2 30.6 18.2 30.6
           C25.2 30.6 30.8 24.2 30.8 16.6
           C30.8 13.4 29.8 10.5 28.1 8.4
           C26.9 9.8 24.8 10.4 23.1 9.5
           C21.8 8.8 21.2 7.4 21.5 6.1
           C20.4 4.9 19.2 4.2 18 4.2 Z"
        fill="url(#cookieDough)"
      />

      {/* Warm toasted rim */}
      <path
        d="M18 4.2
           C11.1 4.2 5.6 9.5 5.6 16.6
           C5.6 24.2 11.2 30.6 18.2 30.6
           C25.2 30.6 30.8 24.2 30.8 16.6
           C30.8 13.4 29.8 10.5 28.1 8.4
           C26.9 9.8 24.8 10.4 23.1 9.5
           C21.8 8.8 21.2 7.4 21.5 6.1
           C20.4 4.9 19.2 4.2 18 4.2 Z"
        fill="none"
        stroke="#c99563"
        strokeOpacity="0.55"
        strokeWidth="1.15"
      />

      {/* Bite scallops for a clearer cookie read */}
      <circle cx="24.8" cy="5.2" fill="#8f5738" r="2.35" />
      <circle cx="28.4" cy="7.8" fill="#8f5738" r="2.15" />
      <circle cx="30.2" cy="11.4" fill="#8f5738" r="1.85" />

      {/* Chocolate chips — vivid cocoa tones */}
      <circle cx="13.2" cy="13.4" fill="url(#chipShine)" r="2.05" />
      <circle cx="20.6" cy="12.2" fill="#3f2115" r="1.55" />
      <circle cx="16.8" cy="18.8" fill="#5d3a3a" r="1.85" />
      <circle cx="23.4" cy="18.2" fill="url(#chipShine)" r="1.7" />
      <circle cx="12.4" cy="21.6" fill="#3f2115" r="1.25" />
      <circle cx="19.2" cy="24.2" fill="#4a2a1c" r="1.35" />

      {/* Tiny crumb / sugar flecks */}
      <circle cx="10.8" cy="16.8" fill="#fff8f4" opacity="0.55" r="0.55" />
      <circle cx="25.2" cy="14.6" fill="#fff8f4" opacity="0.45" r="0.45" />
      <circle cx="15.4" cy="14.8" fill="#fff8f4" opacity="0.4" r="0.35" />
    </svg>
  );
}
