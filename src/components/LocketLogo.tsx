import React from "react";

export function LocketLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-gold-500/40 via-amber-400/20 to-purple-600/30 blur-xl animate-pulse-slow" />
      
      {/* Container */}
      <div className="relative w-full h-full rounded-2xl p-[1.5px] bg-gradient-to-b from-gold-300 via-gold-500 to-amber-700 shadow-gold-glow">
        <div className="w-full h-full rounded-[14px] bg-[#0c1022] flex items-center justify-center overflow-hidden relative">
          {/* Subtle light sweep reflection */}
          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 transform pointer-events-none" />

          {/* Locket Camera & Heart Glyph SVG */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/5 h-3/5 text-gold-400 drop-shadow-[0_2px_8px_rgba(245,197,66,0.5)]"
          >
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF1AA" />
                <stop offset="0.5" stopColor="#F5C542" />
                <stop offset="1" stopColor="#D99E0B" />
              </linearGradient>
              <linearGradient id="purpleGold" x1="0" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A78BFA" />
                <stop offset="1" stopColor="#F5C542" />
              </linearGradient>
            </defs>

            {/* Rounded outer aperture ring */}
            <circle
              cx="24"
              cy="24"
              r="18"
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeDasharray="3 1.5"
              opacity="0.8"
            />
            
            {/* Inner accent ring */}
            <circle
              cx="24"
              cy="24"
              r="13"
              fill="rgba(245, 197, 66, 0.08)"
              stroke="url(#goldGradient)"
              strokeWidth="1.2"
            />

            {/* Heart symbol at the center */}
            <path
              d="M24 29.5L22.55 28.18C17.4 23.51 14 20.43 14 16.63C14 13.54 16.42 11.13 19.5 11.13C21.24 11.13 22.91 11.94 24 13.21C25.09 11.94 26.76 11.13 28.5 11.13C31.58 11.13 34 13.54 34 16.63C34 20.43 30.6 23.51 25.45 28.2L24 29.5Z"
              fill="url(#goldGradient)"
            />

            {/* Sparkle highlight */}
            <circle cx="31" cy="14" r="1.5" fill="#FFFFFF" opacity="0.9" />
          </svg>
        </div>
      </div>
    </div>
  );
}
