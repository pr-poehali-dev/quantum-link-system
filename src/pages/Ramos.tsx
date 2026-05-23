import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import Icon from "@/components/ui/icon"
import { StarField } from "@/components/StarField"

const trophies = [
  { year: "2006–07", title: "Чемпион Испании (Ла Лига)", icon: "Trophy", category: "liga" },
  { year: "2007–08", title: "Чемпион Испании (Ла Лига)", icon: "Trophy", category: "liga" },
  { year: "2011–12", title: "Чемпион Испании (Ла Лига)", icon: "Trophy", category: "liga" },
  { year: "2016–17", title: "Чемпион Испании (Ла Лига)", icon: "Trophy", category: "liga" },
  { year: "2019–20", title: "Чемпион Испании (Ла Лига)", icon: "Trophy", category: "liga" },
  { year: "2010–11", title: "Кубок Короля", icon: "Crown", category: "cup" },
  { year: "2013–14", title: "Лига Чемпионов (La Décima)", icon: "Medal", category: "cl" },
  { year: "2015–16", title: "Лига Чемпионов", icon: "Medal", category: "cl" },
  { year: "2016–17", title: "Лига Чемпионов", icon: "Medal", category: "cl" },
  { year: "2017–18", title: "Лига Чемпионов", icon: "Medal", category: "cl" },
  { year: "2014", title: "Суперкубок UEFA", icon: "Zap", category: "super" },
  { year: "2016", title: "Суперкубок UEFA", icon: "Zap", category: "super" },
  { year: "2017", title: "Суперкубок UEFA", icon: "Zap", category: "super" },
  { year: "2014", title: "Клубный чемпионат мира", icon: "Globe", category: "world" },
  { year: "2016", title: "Клубный чемпионат мира", icon: "Globe", category: "world" },
  { year: "2017", title: "Клубный чемпионат мира", icon: "Globe", category: "world" },
  { year: "2008", title: "Суперкубок Испании", icon: "Star", category: "super" },
  { year: "2012", title: "Суперкубок Испании", icon: "Star", category: "super" },
  { year: "2017", title: "Суперкубок Испании", icon: "Star", category: "super" },
  { year: "2019", title: "Суперкубок Испании", icon: "Star", category: "super" },
  { year: "2020", title: "Суперкубок Испании", icon: "Star", category: "super" },
]

const stats = [
  { label: "Голов за Реал", value: "101" },
  { label: "Матчей сыграно", value: "671" },
  { label: "Трофеев", value: "22" },
  { label: "Лет в клубе", value: "16" },
  { label: "Голов в ЛЧ", value: "15" },
  { label: "Кап. в сборной", value: "180" },
]

const categoryColors: Record<string, string> = {
  liga: "#FFD700", cup: "#C0C0C0", cl: "#00BFFF", super: "#FF8C00", world: "#7CFC00",
}
const categoryLabels: Record<string, string> = {
  liga: "Ла Лига", cup: "Кубок", cl: "Лига Чемпионов", super: "Суперкубок", world: "Клубный ЧМ",
}

export default function Ramos() {
  const navigate = useNavigate()
  const [heroVisible, setHeroVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [trophiesVisible, setTrophiesVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const trophiesRef = useRef<HTMLDivElement>(null)

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.1 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setTrophiesVisible(true) }, { threshold: 0.05 })
    if (trophiesRef.current) obs.observe(trophiesRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0"><StarField blurAmount={0} /></div>
        <button onClick={() => navigate("/")} className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
          <Icon name="ArrowLeft" size={18} /> На главную
        </button>
        <div className={cn("relative z-10 text-center px-4 transition-all duration-1000 ease-out", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full text-4xl font-black mb-6 border-4" style={{ background: "linear-gradient(135deg, #003087 0%, #00205B 100%)", borderColor: "#FFD700", color: "#FFD700", fontFamily: "Oswald, sans-serif" }}>4</div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Серхио</h1>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-6" style={{ fontFamily: "Oswald, sans-serif" }}>Рамос</h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-2">2005 – 2021 · Реал Мадрид</p>
          <p className="text-gray-400 text-base max-w-xl mx-auto">Железный капитан. 22 трофея, 671 матч и бесчисленные спасения в последние минуты. Лидер, рождённый для великих моментов.</p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm" style={{ color: "#FFD700" }}><Icon name="ChevronDown" size={20} /><span>Трофеи и статистика</span></div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-black uppercase mb-12" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Статистика за Реал Мадрид</h2>
          <div ref={statsRef} className={cn("grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 ease-out", statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl p-6 text-center border border-gray-800 hover:border-yellow-500 transition-colors" style={{ background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)" }}>
                <div className="text-5xl font-black mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-black uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Все трофеи за Реал Мадрид</h2>
          <p className="text-center text-gray-400 mb-8">22 титула · 2005–2021</p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-3 h-3 rounded-full" style={{ background: categoryColors[key] }} />{label}
              </div>
            ))}
          </div>
          <div ref={trophiesRef} className={cn("max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-1000 ease-out", trophiesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            {trophies.map((t, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl p-4 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105" style={{ background: "#111827" }}>
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `${categoryColors[t.category]}20`, border: `2px solid ${categoryColors[t.category]}` }}>
                  <Icon name={t.icon} size={22} style={{ color: categoryColors[t.category] }} />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm leading-tight">{t.title}</div>
                  <div className="text-xs mt-1" style={{ color: categoryColors[t.category] }}>{t.year}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center px-4" style={{ background: "linear-gradient(135deg, #00205B 0%, #003087 100%)" }}>
        <blockquote className="max-w-3xl mx-auto">
          <p className="text-2xl md:text-3xl font-light italic text-white/90 mb-6">"Я родился для того, чтобы выигрывать. Реал Мадрид — это место, где рождаются победители."</p>
          <footer className="font-black uppercase tracking-widest text-lg" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>— Серхио Рамос</footer>
        </blockquote>
        <button onClick={() => navigate("/")} className="mt-12 inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold transition-all hover:scale-105" style={{ borderColor: "#FFD700", color: "#FFD700" }}>
          <Icon name="ArrowLeft" size={18} /> Вернуться на главную
        </button>
      </section>
    </div>
  )
}
