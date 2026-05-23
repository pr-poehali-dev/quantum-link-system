import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import Icon from "@/components/ui/icon"
import { StarField } from "@/components/StarField"

const victories = [
  {
    year: "1998",
    title: "Лига Чемпионов",
    opponent: "Ювентус 1–0",
    description: "Гол Предрага Миятовича принёс Реалу 7-й трофей ЛЧ после 32-летнего ожидания. Незабываемая ночь в Амстердаме.",
    icon: "Medal",
    category: "cl",
    emoji: "🏆",
  },
  {
    year: "2000",
    title: "Лига Чемпионов",
    opponent: "Валенсия 3–0",
    description: "Гол Макнамана и дубль Рауля. Реал разгромил испанского соперника в финале в Париже. 8-я Лига Чемпионов.",
    icon: "Medal",
    category: "cl",
    emoji: "🏆",
  },
  {
    year: "2002",
    title: "Лига Чемпионов",
    opponent: "Байер Леверкузен 2–1",
    description: "Легендарный удар Зидана с лёта — один из красивейших голов в истории ЛЧ. 9-я Кубок Чемпионов для Реала.",
    icon: "Medal",
    category: "cl",
    emoji: "⚽",
  },
  {
    year: "2014",
    title: "La Décima",
    opponent: "Атлетико Мадрид 4–1",
    description: "93-я минута. Рамос! Затем в овертайме — Бэйл, Марсело и Роналду. Десятая Лига Чемпионов после 12 лет ожидания.",
    icon: "Medal",
    category: "cl",
    emoji: "🔟",
  },
  {
    year: "2016",
    title: "Лига Чемпионов",
    opponent: "Атлетико Мадрид 5–3 пен.",
    description: "Рамос забил первый — и последний пенальти в серии пробил Роналду. Реал стал первым клубом, защитившим титул в эпохе ЛЧ.",
    icon: "Medal",
    category: "cl",
    emoji: "🏆",
  },
  {
    year: "2017",
    title: "Лига Чемпионов",
    opponent: "Ювентус 4–1",
    description: "Дубли Роналду и Касильяса. Реал стал первым клубом, выигравшим ЛЧ три раза подряд. Доминирование эпохи Зидана.",
    icon: "Medal",
    category: "cl",
    emoji: "👑",
  },
  {
    year: "2018",
    title: "Лига Чемпионов",
    opponent: "Ливерпуль 3–1",
    description: "Бейл вышел на замену и забил гол с лёта — один из лучших голов в истории финалов ЛЧ. Четвёртая ЛЧ за 5 лет.",
    icon: "Medal",
    category: "cl",
    emoji: "🚀",
  },
  {
    year: "2022",
    title: "Лига Чемпионов",
    opponent: "Ливерпуль 1–0",
    description: "Виниcius Jr. забил единственный гол. Но настоящий герой турнира — Куртуа, сделавший 9 сейвов в финале. 14-я ЛЧ!",
    icon: "Medal",
    category: "cl",
    emoji: "🧤",
  },
  {
    year: "2003",
    title: "Чемпион Испании",
    opponent: "29 очков отрыв",
    description: "«Galácticos» в лучшем виде — Зидан, Роналдо, Фигу, Рауль, Роберто Карлос. Один из самых сильных составов в истории клуба.",
    icon: "Trophy",
    category: "liga",
    emoji: "⭐",
  },
  {
    year: "2012",
    title: "Рекорд Ла Лиги",
    opponent: "100 очков в сезоне",
    description: "100 очков, 121 гол за сезон, 32 победы — рекорд Ла Лиги. Моуринью и Реал Мадрид установили недосягаемую планку.",
    icon: "Trophy",
    category: "liga",
    emoji: "💯",
  },
]

const categoryColors: Record<string, string> = {
  cl: "#00BFFF",
  liga: "#FFD700",
}

const totalTrophies = [
  { label: "Лига Чемпионов / Кубок Чемпионов", value: "15" },
  { label: "Чемпионат Испании (Ла Лига)", value: "36" },
  { label: "Кубок Короля", value: "20" },
  { label: "Суперкубок Испании", value: "13" },
  { label: "Суперкубок UEFA", value: "5" },
  { label: "Клубный чемпионат мира", value: "8" },
]

export default function Victories() {
  const navigate = useNavigate()
  const [heroVisible, setHeroVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [victoriesVisible, setVictoriesVisible] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const victoriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true) }, { threshold: 0.1 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVictoriesVisible(true) }, { threshold: 0.05 })
    if (victoriesRef.current) obs.observe(victoriesRef.current)
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
          <div className="text-8xl mb-6">🏆</div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Великие</h1>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tight mb-6" style={{ fontFamily: "Oswald, sans-serif" }}>Победы</h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-2">Реал Мадрид · Клуб Века</p>
          <p className="text-gray-400 text-base max-w-xl mx-auto">Самые великие победы в истории клуба — финалы, рекорды и незабываемые моменты, вошедшие в историю мирового футбола.</p>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm" style={{ color: "#FFD700" }}><Icon name="ChevronDown" size={20} /><span>История побед</span></div>
        </div>
      </section>

      {/* Total Trophies */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-black uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Трофеи Реал Мадрида</h2>
          <p className="text-center text-gray-400 mb-12">Крупнейшая коллекция в истории футбола</p>
          <div ref={statsRef} className={cn("grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 ease-out", statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            {totalTrophies.map((s) => (
              <div key={s.label} className="rounded-xl p-6 text-center border border-gray-800 hover:border-yellow-500 transition-colors" style={{ background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)" }}>
                <div className="text-5xl font-black mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>{s.value}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Victories */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-black uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Величайшие матчи</h2>
          <p className="text-center text-gray-400 mb-12">Финалы и рекорды, вошедшие в историю</p>
          <div ref={victoriesRef} className={cn("max-w-4xl mx-auto space-y-6 transition-all duration-1000 ease-out", victoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}>
            {victories.map((v, i) => (
              <div key={i} className="flex gap-4 rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-[1.01]" style={{ background: "#111827" }}>
                <div className="flex-shrink-0 text-4xl">{v.emoji}</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-2xl font-black" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>{v.year}</span>
                    <span className="font-bold text-white text-lg">{v.title}</span>
                    <span className="text-sm px-2 py-1 rounded-full" style={{ background: `${categoryColors[v.category]}20`, color: categoryColors[v.category] }}>
                      {v.opponent}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center px-4" style={{ background: "linear-gradient(135deg, #00205B 0%, #003087 100%)" }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-6">👑</div>
          <h3 className="text-3xl font-black uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Клуб Века</h3>
          <p className="text-white/80 text-lg mb-8">В 2000 году ФИФА признала Реал Мадрид лучшим футбольным клубом XX века. Это не просто клуб — это история самого футбола.</p>
        </div>
        <button onClick={() => navigate("/")} className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold transition-all hover:scale-105" style={{ borderColor: "#FFD700", color: "#FFD700" }}>
          <Icon name="ArrowLeft" size={18} /> Вернуться на главную
        </button>
      </section>
    </div>
  )
}
