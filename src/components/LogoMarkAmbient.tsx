// Ambient version of the Mia Meow mark for the hero background: very faint, tilted, and alive.
// Eyes blink every few seconds (occasionally twice), whiskers twitch, the whole face drifts a hair.
// All motion is CSS (src/index.css, .ambient-mark) and collapses under prefers-reduced-motion.
export function LogoMarkAmbient({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
    <svg viewBox="20 22 180 96" className="ambient-mark block w-full h-auto" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path strokeWidth="15" d="M62 104 C61.5 84, 63 60, 67.5 42 C69.5 33.5, 79 32.5, 84 41 C92 51.5, 102 64.5, 110 72 C118 64.5, 128 51.5, 136 41 C141 32.5, 150.5 33.5, 152.5 42 C157 60, 158.5 84, 158 104" />
      <g className="wl">
        <path strokeWidth="10.5" d="M62 76 C53 73.5, 43 71.5, 34 70.5" />
        <path strokeWidth="10.5" d="M61.5 87 C52 87, 42 87, 32 87.5" />
        <path strokeWidth="10.5" d="M62 98 C53 100, 44 102.5, 35 104.5" />
      </g>
      <g className="wr">
        <path strokeWidth="10.5" d="M158 76 C167 73.5, 177 71.5, 186 70.5" />
        <path strokeWidth="10.5" d="M158.5 87 C168 87, 178 87, 188 87.5" />
        <path strokeWidth="10.5" d="M158 98 C167 100, 176 102.5, 185 104.5" />
      </g>
      <circle className="eye" cx="97" cy="99" r="6.4" fill="currentColor" stroke="none" />
      <circle className="eye" cx="123" cy="99" r="6.4" fill="currentColor" stroke="none" />
    </svg>
    </div>
  )
}
