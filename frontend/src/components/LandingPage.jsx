import { useState, useEffect } from 'react'

/* ── Organic SVG Globe ───────────────────────────────────────────────────── */
function OrganicGlobe() {
  return (
    <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto select-none">

      {/* Ambient glow rings */}
      <div className="absolute inset-0 rounded-full bg-emerald-400/10 blur-3xl animate-pulse-green" />
      <div className="absolute inset-8 rounded-full bg-lime-300/10 blur-2xl" style={{animationDelay:'1.5s'}} />

      {/* Orbiting satellite dot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-orbit">
          <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-glow-sm" />
        </div>
        <div className="absolute animate-orbit-slow" style={{transform:'rotate(60deg)'}}>
          <div className="w-2 h-2 rounded-full bg-lime-400 shadow-glow-sm" style={{transform:'rotate(-60deg)'}} />
        </div>
      </div>

      <svg viewBox="0 0 320 320" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="globeOcean" cx="40%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#e0f7ef" />
            <stop offset="40%"  stopColor="#b2f5d0" />
            <stop offset="100%" stopColor="#68dba9" />
          </radialGradient>
          <radialGradient id="globeLand" cx="50%" cy="40%" r="60%">
            <stop offset="0%"   stopColor="#059669" />
            <stop offset="100%" stopColor="#065f46" />
          </radialGradient>
          <radialGradient id="globeGlow" cx="35%" cy="30%" r="60%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="soften">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <clipPath id="globeClip">
            <circle cx="160" cy="160" r="128"/>
          </clipPath>
        </defs>

        {/* Ocean */}
        <circle cx="160" cy="160" r="128" fill="url(#globeOcean)" />

        {/* Continents */}
        <g clipPath="url(#globeClip)" fill="url(#globeLand)" opacity="0.9">
          <path d="M58,96 Q76,80 104,87 Q124,94 132,112 Q138,128 125,144 Q110,158 90,153 Q70,148 60,132 Q50,114 58,96Z"/>
          <path d="M96,168 Q112,160 126,170 Q138,182 134,204 Q128,224 112,228 Q96,232 88,218 Q80,202 84,184Z"/>
          <path d="M150,83 Q168,75 182,82 Q194,90 192,104 Q188,116 176,118 Q162,121 154,111 Q146,99 150,83Z"/>
          <path d="M156,128 Q174,122 186,134 Q200,150 198,172 Q194,194 180,204 Q166,212 154,206 Q140,198 138,178 Q136,156 144,140Z"/>
          <path d="M204,79 Q228,69 248,82 Q266,94 268,114 Q270,134 256,146 Q238,156 216,150 Q196,142 194,122 Q192,98 204,79Z"/>
          <path d="M226,172 Q242,164 254,175 Q264,188 260,202 Q252,216 238,218 Q224,218 218,206 Q212,192 220,180Z"/>
        </g>

        {/* Grid lines */}
        <g clipPath="url(#globeClip)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" fill="none">
          <ellipse cx="160" cy="160" rx="128" ry="32" />
          <ellipse cx="160" cy="160" rx="128" ry="64" />
          <ellipse cx="160" cy="160" rx="128" ry="96" />
          <ellipse cx="160" cy="160" rx="128" ry="118" />
          <ellipse cx="160" cy="160" rx="32"  ry="128" />
          <ellipse cx="160" cy="160" rx="64"  ry="128" />
          <ellipse cx="160" cy="160" rx="96"  ry="128" />
        </g>

        {/* Scan line */}
        <rect x="32" y="0" width="256" height="3" fill="rgba(52,211,153,0.6)" rx="1" clipPath="url(#globeClip)">
          <animateTransform attributeName="transform" type="translate"
            values="0,-140;0,140;0,-140" dur="4s" repeatCount="indefinite"/>
        </rect>

        {/* Highlight sheen */}
        <circle cx="160" cy="160" r="128" fill="url(#globeGlow)" clipPath="url(#globeClip)" />

        {/* Atmosphere ring */}
        <circle cx="160" cy="160" r="128" fill="none" stroke="rgba(52,211,153,0.4)" strokeWidth="2.5" filter="url(#glow)"/>
        <circle cx="160" cy="160" r="134" fill="none" stroke="rgba(163,230,53,0.15)" strokeWidth="5"/>

        {/* Field pins */}
        {[
          { cx: 94,  cy: 128, color: '#059669', delay: '0s' },
          { cx: 166, cy: 166, color: '#d97706', delay: '0.8s' },
          { cx: 230, cy: 115, color: '#dc2626', delay: '1.6s' },
        ].map(({ cx, cy, color, delay }, i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill={color}>
              <animate attributeName="r" values="4;8;4" dur="2.5s" begin={delay} repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" begin={delay} repeatCount="indefinite"/>
            </circle>
            <circle cx={cx} cy={cy} r="5" fill="white" opacity="0.85"/>
            <circle cx={cx} cy={cy} r="2.5" fill={color}/>
          </g>
        ))}

        {/* Center crosshair */}
        <g stroke="rgba(255,255,255,0.35)" strokeWidth="1">
          <line x1="154" y1="160" x2="144" y2="160"/>
          <line x1="166" y1="160" x2="176" y2="160"/>
          <line x1="160" y1="154" x2="160" y2="144"/>
          <line x1="160" y1="166" x2="160" y2="176"/>
        </g>
      </svg>

      {/* Floating stat badges */}
      <div className="absolute -top-2 -right-4 glass-card-sm px-3.5 py-2.5 animate-float-slow" style={{animationDelay:'0s'}}>
        <div className="label-caps text-emerald-700 mb-0.5">NDVI Score</div>
        <div className="metric-value text-2xl text-emerald-600">0.82</div>
      </div>
      <div className="absolute top-1/2 -left-6 glass-card-sm px-3.5 py-2.5 animate-float-mid" style={{animationDelay:'2s'}}>
        <div className="label-caps text-amber-700 mb-0.5">Warning</div>
        <div className="metric-value text-2xl text-amber-600">0.45</div>
      </div>
      <div className="absolute -bottom-2 right-6 glass-card-sm px-3.5 py-2.5 animate-float-slow" style={{animationDelay:'4s'}}>
        <div className="label-caps text-emerald-700 mb-0.5">Fields Active</div>
        <div className="metric-value text-2xl text-emerald-600">3</div>
      </div>
    </div>
  )
}

/* ── Agriculture field strip ─────────────────────────────────────────────── */
function FieldStrip() {
  const rows = Array.from({ length: 16 }, (_, i) => {
    const health = 0.28 + Math.sin(i * 0.8 + 1) * 0.38
    const g = Math.round(180 * health)
    const r = Math.round(40 + 60 * (1 - health))
    return { i, color: `rgb(${r},${g},60)`, health }
  })

  return (
    <svg viewBox="0 0 720 96" className="w-full rounded-2xl overflow-hidden" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="96" fill="#e9efe9" rx="16"/>
      {rows.map(({ i, color }) => (
        <g key={i}>
          <rect x={i * 44 + 8} y={8} width={36} height={80} rx={6} fill={color} opacity={0.75}/>
          {[20, 32, 44, 56, 68].map(y => (
            <line key={y} x1={i*44+10} y1={y} x2={i*44+42} y2={y}
              stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
          ))}
        </g>
      ))}
      {/* Animated scan beam */}
      <rect y="0" width="8" height="96" rx="4" fill="rgba(52,211,153,0.5)">
        <animateTransform attributeName="transform" type="translate"
          values="-10,0;730,0;-10,0" dur="3.5s" repeatCount="indefinite"/>
      </rect>
      <text x="12" y="90" fill="rgba(23,29,25,0.4)" fontSize="9" fontFamily="'Be Vietnam Pro', sans-serif" fontWeight="700">
        NIR COMPOSITE · FIELD GAMMA · MOISTURE STRESS DETECTED
      </text>
    </svg>
  )
}

/* ── Feature card ────────────────────────────────────────────────────────── */
function FeatureCard({ icon, title, desc, accent = 'emerald', delay = '0ms' }) {
  const colors = {
    emerald: 'bg-emerald-100 text-emerald-700',
    lime:    'bg-lime-100 text-lime-700',
    amber:   'bg-amber-100 text-amber-700',
    red:     'bg-red-100 text-red-700',
    teal:    'bg-teal-100 text-teal-700',
    green:   'bg-green-100 text-green-700',
  }
  return (
    <div
      className="glass-card p-6 hover-lift"
      style={{ animationDelay: delay }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-xl ${colors[accent]}`}>
        {icon}
      </div>
      <h3 className="font-display font-bold text-lg text-on-surface mb-2">{title}</h3>
      <p className="text-sm text-on-surface-v leading-relaxed">{desc}</p>
    </div>
  )
}

/* ── NDVI bar ────────────────────────────────────────────────────────────── */
function NdviBar({ label, value, status }) {
  const pct = Math.round(value * 100)
  const color = status === 'Healthy' ? 'from-emerald-400 to-lime-400'
    : status === 'Warning' ? 'from-amber-400 to-yellow-300'
    : 'from-red-500 to-orange-400'

  return (
    <div className="flex items-center gap-4 py-3 border-b border-surface-high last:border-b-0">
      <div className="w-24 font-display font-bold text-sm text-on-surface">{label}</div>
      <div className="flex-1 progress-track">
        <div className={`progress-fill bg-gradient-to-r ${color}`} style={{ width: `${pct}%` }}/>
      </div>
      <div className="w-12 text-right font-display font-bold text-sm text-on-surface">{value.toFixed(2)}</div>
      <div className="w-16">
        <span className={`chip text-xs ${status === 'Healthy' ? 'chip-healthy' : status === 'Warning' ? 'chip-warning' : 'chip-critical'}`}>
          {status}
        </span>
      </div>
    </div>
  )
}

/* ── Main Landing Page ───────────────────────────────────────────────────── */
export default function LandingPage({ onEnterDashboard }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden relative">

      {/* Decorative organic blobs */}
      <div className="fixed top-0 right-0 w-96 h-96 blob-green opacity-60 pointer-events-none translate-x-32 -translate-y-32" />
      <div className="fixed bottom-0 left-0 w-80 h-80 blob-lime opacity-50 pointer-events-none -translate-x-24 translate-y-24" />

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-glass border-b border-outline-v/40 px-6 py-4 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center shadow-glow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M12 2C6 2 3 8 3 12s3 6 6 8M12 2c6 0 9 6 9 10s-3 6-6 8M12 2v20"/>
              <path d="M3 12h18" strokeDasharray="3 3"/>
            </svg>
          </div>
          <span className="font-display font-bold text-xl text-on-surface tracking-tight">
            Agro<span className="text-gradient-green">Sat</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-on-surface-v">
          {['Platform', 'Science', 'Fields', 'About'].map(item => (
            <span key={item} className="hover:text-primary transition-colors cursor-pointer">{item}</span>
          ))}
        </div>

        <button onClick={onEnterDashboard} className="btn-primary text-sm py-2.5 px-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10"/>
            <path d="M16 12l4 4-4 4" strokeLinecap="round"/>
          </svg>
          Launch Dashboard
        </button>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-sm text-sm font-medium text-emerald-700 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
            AI-Powered · Satellite-Grade · Real-Time
          </div>

          <h1 className="font-display font-black leading-none mb-6">
            <div className="text-5xl lg:text-6xl xl:text-7xl text-on-surface">Precision</div>
            <div className="text-5xl lg:text-6xl xl:text-7xl text-gradient-green">Agriculture</div>
            <div className="text-4xl lg:text-5xl xl:text-6xl text-on-surface-v mt-1">From Orbit</div>
          </h1>

          <p className="text-body-lg text-on-surface-v leading-relaxed max-w-lg mb-8">
            Monitor crop health across your entire farm with AI-driven NDVI analysis,
            real-time satellite diagnostics, and actionable agronomist insights.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <button onClick={onEnterDashboard} className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10"/>
                <path d="M2 12h20M12 2a15 15 0 010 20"/>
              </svg>
              Open Dashboard
            </button>
            <button className="btn-ghost">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M10 8l6 4-6 4V8z" fill="currentColor"/>
              </svg>
              Watch Demo
            </button>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 flex-wrap">
            {[
              { value: '161', label: 'Reasoning Rules' },
              { value: '67',  label: 'UI Style Indices' },
              { value: '3',   label: 'Active Fields' },
              { value: '94%', label: 'AI Confidence' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="metric-value text-3xl text-primary">{value}</div>
                <div className="label-caps mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Globe */}
        <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <OrganicGlobe />
        </div>
      </section>

      {/* ── Field scan strip ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="label-caps mb-3 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10"/><path d="M2 12h20M12 2a15 15 0 010 20"/>
          </svg>
          Live Field Scan · False-Color Composite
        </div>
        <FieldStrip />
      </section>

      {/* ── NDVI Status ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid md:grid-cols-2 gap-12 items-start">

        <div>
          <div className="label-caps mb-4">Field Status Overview</div>
          <div className="glass-card p-6">
            <NdviBar label="Field Alpha" value={0.82} status="Healthy" />
            <NdviBar label="Field Beta"  value={0.45} status="Warning" />
            <NdviBar label="Field Gamma" value={0.28} status="Critical"/>
          </div>
        </div>

        <div>
          <div className="label-caps mb-4">Satellite Telemetry</div>
          <div className="glass-card p-6 grid grid-cols-2 gap-4">
            {[
              ['SAT ID',      'SAT-7 / LEO'],
              ['Altitude',    '523 km'],
              ['Resolution',  '3m / px'],
              ['Pass Interval','14 min'],
              ['Bands',       'NIR+RED+SWIR'],
              ['Last Scan',   new Date().toLocaleTimeString()],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface-low rounded-xl p-3">
                <div className="label-caps mb-1">{k}</div>
                <div className="font-display font-bold text-sm text-primary">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="text-center mb-14">
          <div className="label-caps mb-3">Platform Capabilities</div>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-on-surface">
            Every tool an agronomist needs
          </h2>
          <p className="text-on-surface-v max-w-lg mx-auto mt-4 text-body-lg">
            From multi-spectral analysis to AI-powered recommendations.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard icon="🛰️" accent="emerald" title="Multi-Spectral NDVI"
            desc="Real-time vegetation index from NIR, Red, and SWIR satellite bands with sub-3m resolution."/>
          <FeatureCard icon="🤖" accent="lime" title="AI Agronomist Engine"
            desc="161-rule reasoning system identifies nitrogen deficiency, moisture stress, and pest patterns."/>
          <FeatureCard icon="📈" accent="teal" title="Temporal Trend Analysis"
            desc="6-month NDVI time-series reveals crop degradation trajectories before visual symptoms appear."/>
          <FeatureCard icon="💧" accent="amber" title="Moisture Stress Detection"
            desc="Thermal infrared identifies canopy heat signatures indicating sub-surface water deficit."/>
          <FeatureCard icon="🌱" accent="green" title="Nutrient Deficiency"
            desc="Spectral signature matching against 161-rule database identifies nitrogen, phosphorus and potassium deficiency."/>
          <FeatureCard icon="⚠️" accent="red" title="Early Alert System"
            desc="Tri-level severity alerts dispatched before yield loss becomes irreversible."/>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="glass-emerald p-12 lg:p-16 text-center relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-16 -right-16 w-64 h-64 blob-green opacity-60 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 blob-lime opacity-40 pointer-events-none" />

          <div className="relative z-10">
            <div className="label-caps mb-4 text-emerald-700">Ready to Monitor</div>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-on-surface mb-4">
              Start monitoring from space
            </h2>
            <p className="text-on-surface-v max-w-lg mx-auto mb-8 text-body-lg">
              Three demonstration fields loaded: Field Alpha (Wheat), Field Beta (Cotton), Field Gamma (Maize).
            </p>
            <button onClick={onEnterDashboard} className="btn-primary text-base py-4 px-8">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10"/>
                <path d="M2 12h20M12 2a15 15 0 010 20"/>
              </svg>
              Open Live Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-outline-v/30 px-6 py-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-600 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2C6 2 3 8 3 12s3 6 6 8M12 2c6 0 9 6 9 10s-3 6-6 8"/>
              </svg>
            </div>
            <span className="text-sm font-medium text-on-surface-v">AgroSat — AI Satellite Crop Diagnostics</span>
          </div>
          <span className="text-xs text-outline">All data simulated for demonstration purposes.</span>
        </div>
      </footer>
    </div>
  )
}
