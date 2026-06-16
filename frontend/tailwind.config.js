/** @type {import('tailwindcss').Config} */
// Design System: "Organic Intelligence" from Google Stitch (project: AgroLens AI Dashboard)
// Primary: #006948/#059669 | Secondary: #446900/#a3e635 | Bg: #f5fbf5
// Headlines: Syne 800 | Body: Be Vietnam Pro | Roundness: ROUND_FULL
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans:    ['"Be Vietnam Pro"', 'sans-serif'],
      },
      colors: {
        // Stitch "Organic Intelligence" named colors
        surface:         '#f5fbf5',
        'surface-dim':   '#d5dcd6',
        'surface-low':   '#eff5ef',
        'surface-mid':   '#e9efe9',
        'surface-high':  '#e4eae4',
        'on-surface':    '#171d19',
        'on-surface-v':  '#3d4a42',
        outline:         '#6d7a72',
        'outline-v':     '#bccac0',
        primary:         '#006948',
        'primary-c':     '#00855d',
        'primary-fixed': '#85f8c4',
        'on-primary':    '#ffffff',
        secondary:       '#446900',
        'secondary-c':   '#b2f746',
        'on-secondary':  '#ffffff',
        tertiary:        '#9b3e3b',
        'tertiary-c':    '#ba5551',
        // Override accents from Stitch
        emerald: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        lime: {
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
        },
        stone: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      borderRadius: {
        // ROUND_FULL from Stitch
        'sm':   '0.5rem',
        DEFAULT:'1rem',
        'md':   '1.5rem',
        'lg':   '2rem',
        'xl':   '3rem',
        'full': '9999px',
      },
      spacing: {
        // 8px base from Stitch
        'base': '8px',
        'gutter': '24px',
        'section': '64px',
        'container-pad': '40px',
      },
      fontSize: {
        // Stitch typography scale
        'metrics': ['84px', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '800' }],
        'h-lg':    ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'h-lg-m':  ['32px', { lineHeight: '1.1', fontWeight: '800' }],
        'h-md':    ['24px', { lineHeight: '1.2', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body-md': ['16px', { lineHeight: '1.5' }],
        'label':   ['14px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '700' }],
      },
      boxShadow: {
        // Glassmorphism ambient glow shadows
        'glass':    '0 4px 24px rgba(0,105,72,0.08), inset 0 1px 0 rgba(255,255,255,0.6)',
        'glass-lg': '0 8px 40px rgba(0,105,72,0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
        'glow-sm':  '0 0 16px rgba(5,150,105,0.25)',
        'glow-md':  '0 0 32px rgba(5,150,105,0.35)',
        'leaf':     '0 4px 20px rgba(0,105,72,0.15)',
        'card':     '0 2px 16px rgba(23,29,25,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
      },
      animation: {
        'float-slow':   'float 7s ease-in-out infinite',
        'float-mid':    'float 5s ease-in-out infinite',
        'sprout':       'sprout 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'fade-up':      'fadeUp 0.6s ease-out forwards',
        'pulse-green':  'pulseGreen 3s ease-in-out infinite',
        'orbit':        'orbit 10s linear infinite',
        'orbit-slow':   'orbit 16s linear infinite',
        'leaf-wave':    'leafWave 4s ease-in-out infinite',
        'grow':         'grow 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'scan':         'scan 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-10px) rotate(1deg)' },
          '66%':     { transform: 'translateY(5px) rotate(-0.5deg)' },
        },
        sprout: {
          '0%':   { transform: 'scale(0) rotate(-10deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0deg)',   opacity: '1' },
        },
        fadeUp: {
          '0%':   { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        pulseGreen: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(5,150,105,0.3)' },
          '50%':     { boxShadow: '0 0 0 12px rgba(5,150,105,0)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(110px) rotate(0deg)' },
          to:   { transform: 'rotate(360deg) translateX(110px) rotate(-360deg)' },
        },
        leafWave: {
          '0%,100%': { transform: 'rotate(-5deg)' },
          '50%':     { transform: 'rotate(5deg)' },
        },
        grow: {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
        },
        scan: {
          '0%':   { transform: 'translateY(-10%)' },
          '100%': { transform: 'translateY(110%)' },
        },
      },
      backdropBlur: {
        'glass': '20px',
      },
    },
  },
  plugins: [],
}
