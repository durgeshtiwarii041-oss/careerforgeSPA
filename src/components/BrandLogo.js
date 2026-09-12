import React from "react";

export default function BrandLogo({ dark = false, large = false }) {
  return (
    <svg
      viewBox="0 0 260 205"
      role="img"
      aria-label="CrazyWebDev Academy"
      className={large ? "h-24 w-[138px] shrink-0" : "h-[76px] w-[108px] shrink-0"}
    >
      <defs>
        <linearGradient id="brand-cap" x1="0" x2="1">
          <stop offset="0" stopColor="#123d9a" />
          <stop offset="1" stopColor="#1769ed" />
        </linearGradient>
      </defs>
      <g transform="translate(32 3) scale(.75)">
        <path d="M130 7 204 43 130 79 56 43Z" fill="url(#brand-cap)" />
      <path d="M75 55v28m0 0c0 8 7 13 15 13s15-5 15-13" fill="none" stroke="#102b67" strokeWidth="4" />
      <path d="M90 67v35" stroke="#102b67" strokeWidth="4" />
      <path d="M82 102h16l-5 20h-7Z" fill="#102b67" />
      <path d="M130 78 175 55v37c0 13-12 19-45 35-33-16-45-22-45-35V55Z" fill="#102b67" />
      <rect x="191" y="14" width="13" height="13" rx="2" fill="#102b67" />
      <rect x="211" y="31" width="13" height="13" rx="2" fill="#1769ed" />
      <rect x="230" y="48" width="13" height="13" rx="2" fill="#1769ed" />
      <rect x="201" y="55" width="13" height="13" rx="2" fill="#0e83e9" />
      <path d="M34 125c39-17 72-13 96 8 24-21 57-25 96-8-37-4-67 3-96 23-29-20-59-27-96-23Z" fill="#1769ed" />
      <path d="M25 140c42-15 74-10 105 11 31-21 63-26 105-11-41-3-73 7-105 25-32-18-64-28-105-25Z" fill="#102b67" />
      </g>
      <text x="130" y="151" textLength="222" lengthAdjust="spacingAndGlyphs" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="25" fontWeight="700" fill={dark ? "#fff" : "#102b67"}>Crazy<tspan fill="#1769ed">WebDev</tspan></text>
      <path d="M20 164h45m130 0h45" stroke="#1769ed" strokeWidth="2" />
      <text x="130" y="181" textLength="116" lengthAdjust="spacingAndGlyphs" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" fill={dark ? "#cbd5e1" : "#102b67"}>ACADEMY</text>
    </svg>
  );
}
