// Mia Meow logo mark v2 (2026-09-15). Source of truth: workspace _brand/logo-mark.svg. Do not redraw here; re-copy the paths.
export function LogoMark({ className = 'h-7 w-auto', title = 'Mia Meow' }: { className?: string; title?: string }) {
  return (
    <svg viewBox="20 22 180 96" className={className} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={title}>
      <path strokeWidth="15" d="M62 104 C61.5 84, 63 60, 67.5 42 C69.5 33.5, 79 32.5, 84 41 C92 51.5, 102 64.5, 110 72 C118 64.5, 128 51.5, 136 41 C141 32.5, 150.5 33.5, 152.5 42 C157 60, 158.5 84, 158 104" />
      <path strokeWidth="10.5" d="M62 76 C53 73.5, 43 71.5, 34 70.5" />
      <path strokeWidth="10.5" d="M61.5 87 C52 87, 42 87, 32 87.5" />
      <path strokeWidth="10.5" d="M62 98 C53 100, 44 102.5, 35 104.5" />
      <path strokeWidth="10.5" d="M158 76 C167 73.5, 177 71.5, 186 70.5" />
      <path strokeWidth="10.5" d="M158.5 87 C168 87, 178 87, 188 87.5" />
      <path strokeWidth="10.5" d="M158 98 C167 100, 176 102.5, 185 104.5" />
      <circle cx="97" cy="99" r="6.4" fill="currentColor" stroke="none" />
      <circle cx="123" cy="99" r="6.4" fill="currentColor" stroke="none" />
    </svg>
  )
}
