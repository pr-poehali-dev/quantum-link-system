import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import Icon from "@/components/ui/icon"
import { StarField } from "@/components/StarField"

type MatchStatus = "upcoming" | "live" | "finished"
type Competition = "laliga" | "ucl" | "copa" | "supercopa"

interface Match {
  date: string
  time: string
  opponent: string
  opponentFlag: string
  venue: "home" | "away"
  competition: Competition
  status: MatchStatus
  score?: string
  result?: "W" | "D" | "L"
  matchday: string
}

interface NewsItem {
  date: string
  category: string
  categoryColor: string
  title: string
  summary: string
  emoji: string
  hot: boolean
}

const competitionNames: Record<Competition, string> = {
  laliga: "Ла Лига",
  ucl: "Лига Чемпионов",
  copa: "Кубок Короля",
  supercopa: "Суперкубок",
}
const competitionColors: Record<Competition, string> = {
  laliga: "#FFD700",
  ucl: "#00BFFF",
  copa: "#FF8C00",
  supercopa: "#C0C0C0",
}

const matches: Match[] = [
  {
    date: "18 мая 2025", time: "22:00", opponent: "Эспаньол", opponentFlag: "🇪🇸",
    venue: "home", competition: "laliga", status: "finished",
    score: "3–1", result: "W", matchday: "Тур 36",
  },
  {
    date: "21 мая 2025", time: "22:00", opponent: "Вильярреал", opponentFlag: "🇪🇸",
    venue: "away", competition: "laliga", status: "finished",
    score: "2–2", result: "D", matchday: "Тур 37",
  },
  {
    date: "25 мая 2025", time: "21:00", opponent: "Реал Сосьедад", opponentFlag: "🇪🇸",
    venue: "home", competition: "laliga", status: "upcoming",
    matchday: "Тур 38 · Финальный",
  },
  {
    date: "31 мая 2025", time: "21:00", opponent: "Атлетик Бильбао", opponentFlag: "🇪🇸",
    venue: "away", competition: "copa", status: "upcoming",
    matchday: "Финал Кубка Короля",
  },
  {
    date: "7 июня 2025", time: "22:00", opponent: "ПСЖ", opponentFlag: "🇫🇷",
    venue: "away", competition: "ucl", status: "upcoming",
    matchday: "Полуфинал ЛЧ · Ответный",
  },
  {
    date: "15 июня 2025", time: "22:00", opponent: "Интер", opponentFlag: "🇮🇹",
    venue: "neutral", competition: "ucl", status: "upcoming",
    matchday: "Финал ЛЧ · Мюнхен",
  },
]

const news: NewsItem[] = [
  {
    date: "23 мая 2025",
    category: "Трансфер",
    categoryColor: "#FFD700",
    title: "Мбаппе назван лучшим игроком месяца в Ла Лиге",
    summary: "Килиан Мбаппе получил награду лучшего игрока апреля после серии из 5 голов в 3 матчах. Французский форвард набирает форму в нужный момент.",
    emoji: "⚽",
    hot: true,
  },
  {
    date: "22 мая 2025",
    category: "Матч",
    categoryColor: "#00BFFF",
    title: "Реал вышел в финал Кубка Короля, разгромив Барселону",
    summary: "В полуфинальном Эль Класико Реал победил 4–2. Хет-трик Виниуса и гол Беллингема отправили мадридцев в финал.",
    emoji: "🔥",
    hot: true,
  },
  {
    date: "21 мая 2025",
    category: "Команда",
    categoryColor: "#7CFC00",
    title: "Модрич объявил о продлении контракта до 2026 года",
    summary: "39-летний хорватский полузащитник подписал новое соглашение с клубом. Лука продолжает удивлять всех своим уровнем игры.",
    emoji: "🤝",
    hot: false,
  },
  {
    date: "20 мая 2025",
    category: "ЛЧ",
    categoryColor: "#00BFFF",
    title: "Реал Мадрид в полуфинале ЛЧ: победа над Манчестер Сити",
    summary: "Дубль Родриго и гол Беллингема вывели Реал в полуфинал Лиги Чемпионов. Куртуа отразил пенальти на последних минутах.",
    emoji: "👑",
    hot: false,
  },
  {
    date: "18 мая 2025",
    category: "Игрок",
    categoryColor: "#FF8C00",
    title: "Беллингем — лучший молодой игрок сезона по версии UEFA",
    summary: "Джуд Беллингем получил престижную награду по итогам блестящего второго сезона. 21 гол и 12 ассистов в активе полузащитника.",
    emoji: "🌟",
    hot: false,
  },
  {
    date: "17 мая 2025",
    category: "Стадион",
    categoryColor: "#C0C0C0",
    title: "Бернабеу установил рекорд посещаемости в сезоне",
    summary: "В матче с Атлетико Мадрид новый Сантьяго Бернабеу принял 85 000 зрителей — рекорд обновлённой арены за всё время существования.",
    emoji: "🏟️",
    hot: false,
  },
]

const resultColors = { W: "#7CFC00", D: "#FFD700", L: "#FF4444" }
const resultLabels = { W: "П", D: "Н", L: "П" }

export default function NewsSchedule() {
  const navigate = useNavigate()
  const [heroVisible, setHeroVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"schedule" | "news">("schedule")
  const [contentVisible, setContentVisible] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setContentVisible(true) }, { threshold: 0.05 })
    if (contentRef.current) obs.observe(contentRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0"><StarField blurAmount={0} /></div>
        <button onClick={() => navigate("/")} className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
          <Icon name="ArrowLeft" size={18} /> На главную
        </button>
        <div className={cn("relative z-10 text-center px-4 transition-all duration-1000 ease-out", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
          <div className="flex gap-4 justify-center text-6xl mb-4">
            <span>📅</span><span>📰</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Матчи</h1>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>и Новости</h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">Реал Мадрид · Сезон 2024–2025 · Всё самое важное</p>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="py-12 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">

          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="flex rounded-xl overflow-hidden border border-gray-800">
              <button
                onClick={() => setActiveTab("schedule")}
                className="flex items-center gap-2 px-8 py-3 font-bold uppercase text-sm transition-all duration-200"
                style={activeTab === "schedule"
                  ? { background: "#FFD700", color: "#000" }
                  : { background: "#111827", color: "#9ca3af" }}
              >
                <Icon name="Calendar" size={16} /> Расписание
              </button>
              <button
                onClick={() => setActiveTab("news")}
                className="flex items-center gap-2 px-8 py-3 font-bold uppercase text-sm transition-all duration-200"
                style={activeTab === "news"
                  ? { background: "#FFD700", color: "#000" }
                  : { background: "#111827", color: "#9ca3af" }}
              >
                <Icon name="Newspaper" size={16} /> Новости
              </button>
            </div>
          </div>

          <div
            ref={contentRef}
            className={cn("max-w-4xl mx-auto transition-all duration-1000 ease-out", contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10")}
          >
            {/* Schedule */}
            {activeTab === "schedule" && (
              <div className="space-y-4">
                {matches.map((m, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-5 border transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      background: m.status === "upcoming" ? "#111827" : "#0d1117",
                      borderColor: m.status === "live" ? "#FF4444" : m.status === "upcoming" ? "#1f2937" : "#0d1117",
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Date & time */}
                      <div className="flex-shrink-0 text-center sm:w-32">
                        <div className="text-xs text-gray-500 uppercase tracking-wide">{m.date}</div>
                        {m.status === "upcoming" && (
                          <div className="text-xl font-black mt-0.5" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>{m.time}</div>
                        )}
                        {m.status === "live" && (
                          <div className="text-sm font-bold mt-0.5 animate-pulse" style={{ color: "#FF4444" }}>🔴 LIVE</div>
                        )}
                        {m.status === "finished" && m.result && (
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-black mt-1" style={{ background: resultColors[m.result], color: "#000" }}>
                            {resultLabels[m.result]}
                          </div>
                        )}
                      </div>

                      {/* Match info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-bold">Реал Мадрид</span>
                          <span className="text-gray-500 text-sm">{m.venue === "home" ? "vs" : "@"}</span>
                          <span className="text-white font-bold">{m.opponentFlag} {m.opponent}</span>
                          {m.score && (
                            <span className="ml-2 text-xl font-black" style={{ fontFamily: "Oswald, sans-serif", color: m.result ? resultColors[m.result] : "#fff" }}>
                              {m.score}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${competitionColors[m.competition]}20`, color: competitionColors[m.competition] }}>
                            {competitionNames[m.competition]}
                          </span>
                          <span className="text-xs text-gray-500">{m.matchday}</span>
                          {m.venue === "home" && <span className="text-xs text-gray-600">🏟️ Бернабеу</span>}
                          {m.venue === "away" && <span className="text-xs text-gray-600">✈️ Выезд</span>}
                          {m.venue === "neutral" && <span className="text-xs text-gray-600">🌍 Нейтральное поле</span>}
                        </div>
                      </div>

                      {/* Arrow for upcoming */}
                      {m.status === "upcoming" && (
                        <div className="flex-shrink-0 hidden sm:flex items-center justify-center w-8 h-8 rounded-full border border-gray-700">
                          <Icon name="ChevronRight" size={16} className="text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="flex flex-wrap gap-4 pt-4 justify-center">
                  {Object.entries(competitionNames).map(([key, name]) => (
                    <div key={key} className="flex items-center gap-1.5 text-xs text-gray-500">
                      <div className="w-2 h-2 rounded-full" style={{ background: competitionColors[key as Competition] }} />
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* News */}
            {activeTab === "news" && (
              <div className="space-y-5">
                {news.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                    style={{ background: "linear-gradient(160deg, #111827 0%, #1a2235 100%)" }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl flex-shrink-0">{item.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: `${item.categoryColor}20`, color: item.categoryColor }}>
                            {item.category}
                          </span>
                          {item.hot && (
                            <span className="text-xs font-bold uppercase px-2 py-0.5 rounded-full animate-pulse" style={{ background: "#FF444420", color: "#FF4444" }}>
                              🔥 Горячее
                            </span>
                          )}
                          <span className="text-xs text-gray-600">{item.date}</span>
                        </div>
                        <h3 className="font-black text-white text-lg leading-tight mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                          {item.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.summary}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-14 text-center px-4" style={{ background: "linear-gradient(135deg, #00205B 0%, #003087 100%)" }}>
        <p className="text-white/60 text-sm mb-6">Данные актуальны на май 2025 · Реал Мадрид · Сезон 2024–25</p>
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold transition-all hover:scale-105" style={{ borderColor: "#FFD700", color: "#FFD700" }}>
          <Icon name="ArrowLeft" size={18} /> На главную
        </button>
      </section>
    </div>
  )
}
