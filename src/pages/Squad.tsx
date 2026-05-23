import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import Icon from "@/components/ui/icon"
import { StarField } from "@/components/StarField"

type Position = "GK" | "DEF" | "MID" | "FWD"

interface Player {
  number: string
  name: string
  fullName: string
  position: Position
  nationality: string
  age: string
  flag: string
  goals?: string
  assists?: string
  matches?: string
  fact: string
  stars: number
}

const players: Player[] = [
  // Вратари
  {
    number: "1", name: "Куртуа", fullName: "Тибо Куртуа", position: "GK",
    nationality: "Бельгия", age: "32", flag: "🇧🇪",
    goals: "—", assists: "—", matches: "180+",
    fact: "9 сейвов в финале ЛЧ-2022 против Ливерпуля — лучший перформанс в истории финалов.",
    stars: 5,
  },
  {
    number: "25", name: "Лунин", fullName: "Андрий Лунин", position: "GK",
    nationality: "Украина", age: "25", flag: "🇺🇦",
    goals: "—", assists: "—", matches: "60+",
    fact: "Герой плей-офф ЛЧ-2024: отразил серию пенальти в четвертьфинале против Манчестер Сити.",
    stars: 4,
  },
  // Защитники
  {
    number: "2", name: "Карвахаль", fullName: "Даниэль Карвахаль", position: "DEF",
    nationality: "Испания", age: "32", flag: "🇪🇸",
    goals: "—", assists: "—", matches: "400+",
    fact: "Чемпион Европы 2024 с Испанией. Лучший правый защитник последнего десятилетия Реала.",
    stars: 5,
  },
  {
    number: "3", name: "Милитао", fullName: "Эдер Милитао", position: "DEF",
    nationality: "Бразилия", age: "26", flag: "🇧🇷",
    goals: "—", assists: "—", matches: "150+",
    fact: "Один из лучших центральных защитников мира. Мощь, скорость и безупречная позиция.",
    stars: 5,
  },
  {
    number: "22", name: "Рюдигер", fullName: "Антонио Рюдигер", position: "DEF",
    nationality: "Германия", age: "31", flag: "🇩🇪",
    goals: "—", assists: "—", matches: "120+",
    fact: "Жёсткий и агрессивный защитник. Стал культовым за свою страсть и нестандартные решения.",
    stars: 4,
  },
  {
    number: "6", name: "Начо", fullName: "Начо Фернандес", position: "DEF",
    nationality: "Испания", age: "34", flag: "🇪🇸",
    goals: "—", assists: "—", matches: "350+",
    fact: "Воспитанник академии Реала. Надёжный ветеран и победитель 6 Лиг Чемпионов.",
    stars: 4,
  },
  {
    number: "23", name: "Ферлан Менди", fullName: "Ферлан Менди", position: "DEF",
    nationality: "Франция", age: "29", flag: "🇫🇷",
    goals: "—", assists: "—", matches: "150+",
    fact: "Быстрый левый защитник с великолепной игрой в обороне. Надёжный щит левого фланга.",
    stars: 4,
  },
  // Полузащитники
  {
    number: "5", name: "Беллингем", fullName: "Джуд Беллингем", position: "MID",
    nationality: "Англия", age: "21", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    goals: "23+", assists: "12+", matches: "50+",
    fact: "Финалист «Золотого мяча» 2024. Гол на 92-й минуте в дебютном Эль Класико. Будущее мирового футбола.",
    stars: 5,
  },
  {
    number: "8", name: "Кроос", fullName: "Тони Кроос", position: "MID",
    nationality: "Германия", age: "34", flag: "🇩🇪",
    goals: "—", assists: "—", matches: "460+",
    fact: "Вернулся из отставки ради Евро-2024. Мозг и метроном команды. 5 Лиг Чемпионов в активе.",
    stars: 5,
  },
  {
    number: "10", name: "Модрич", fullName: "Лука Модрич", position: "MID",
    nationality: "Хорватия", age: "39", flag: "🇭🇷",
    goals: "—", assists: "—", matches: "540+",
    fact: "«Золотой мяч» 2018. Лучший полузащитник поколения. Живая легенда, продолжающая играть на высшем уровне.",
    stars: 5,
  },
  {
    number: "15", name: "Вальверде", fullName: "Федерико Вальверде", position: "MID",
    nationality: "Уругвай", age: "26", flag: "🇺🇾",
    goals: "—", assists: "—", matches: "250+",
    fact: "Двигатель команды. Пробегает больше всех, забивает важнейшие голы и успевает везде.",
    stars: 5,
  },
  {
    number: "18", name: "Чуамени", fullName: "Орельен Чуамени", position: "MID",
    nationality: "Франция", age: "24", flag: "🇫🇷",
    goals: "—", assists: "—", matches: "100+",
    fact: "Оборонительный мозг полузащиты. Перехваты, отборы, точные пасы — будущий лидер Реала.",
    stars: 4,
  },
  // Нападающие
  {
    number: "9", name: "Мбаппе", fullName: "Килиан Мбаппе", position: "FWD",
    nationality: "Франция", age: "25", flag: "🇫🇷",
    goals: "40+", assists: "15+", matches: "60+",
    fact: "Самый быстрый игрок планеты. Чемпион мира 2018. Мечта всего мадридизма стала реальностью в 2024.",
    stars: 5,
  },
  {
    number: "7", name: "Виниус", fullName: "Виниус Жуниор", position: "FWD",
    nationality: "Бразилия", age: "24", flag: "🇧🇷",
    goals: "30+", assists: "20+", matches: "250+",
    fact: "Финалист «Золотого мяча» 2024. Гол в финале ЛЧ-2022. Дриблинг, скорость и харизма — новый символ Реала.",
    stars: 5,
  },
  {
    number: "11", name: "Родриго", fullName: "Родриго Гоэс", position: "FWD",
    nationality: "Бразилия", age: "23", flag: "🇧🇷",
    goals: "20+", assists: "15+", matches: "200+",
    fact: "Мистер Большие Матчи. Дубль против Манчестер Сити в полуфинале ЛЧ вынес команду в финал.",
    stars: 5,
  },
  {
    number: "14", name: "Хосе Луис Гарсия", fullName: "Брахим Диас", position: "FWD",
    nationality: "Испания", age: "25", flag: "🇪🇸",
    goals: "10+", assists: "10+", matches: "100+",
    fact: "Быстрый и техничный вингер. Воспитанник Малаги, прошедший путь через Манчестер Сити.",
    stars: 3,
  },
]

const positionColors: Record<Position, string> = {
  GK: "#FF6B35",
  DEF: "#00BFFF",
  MID: "#7CFC00",
  FWD: "#FFD700",
}

const positionLabels: Record<Position, string> = {
  GK: "Вратарь",
  DEF: "Защитник",
  MID: "Полузащитник",
  FWD: "Нападающий",
}

const positions: Position[] = ["GK", "DEF", "MID", "FWD"]

export default function Squad() {
  const navigate = useNavigate()
  const [heroVisible, setHeroVisible] = useState(false)
  const [activePos, setActivePos] = useState<Position | "ALL">("ALL")
  const [cardsVisible, setCardsVisible] = useState(false)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => { const t = setTimeout(() => setHeroVisible(true), 100); return () => clearTimeout(t) }, [])
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCardsVisible(true) }, { threshold: 0.05 })
    if (cardsRef.current) obs.observe(cardsRef.current)
    return () => obs.disconnect()
  }, [])

  const filtered = activePos === "ALL" ? players : players.filter(p => p.position === activePos)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0"><StarField blurAmount={0} /></div>
        <button onClick={() => navigate("/")} className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm">
          <Icon name="ArrowLeft" size={18} /> На главную
        </button>
        <div className={cn("relative z-10 text-center px-4 transition-all duration-1000 ease-out", heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12")}>
          <div className="text-7xl mb-4">👑</div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Текущий</h1>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4" style={{ fontFamily: "Oswald, sans-serif" }}>Состав</h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">Реал Мадрид · Сезон 2024–2025 · Los Blancos</p>
        </div>
      </section>

      {/* Filter + Cards */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setActivePos("ALL")}
              className="px-5 py-2 rounded-full text-sm font-bold uppercase transition-all duration-200"
              style={activePos === "ALL"
                ? { background: "#FFD700", color: "#000" }
                : { background: "#1f2937", color: "#9ca3af", border: "1px solid #374151" }}
            >
              Все ({players.length})
            </button>
            {positions.map(pos => (
              <button
                key={pos}
                onClick={() => setActivePos(pos)}
                className="px-5 py-2 rounded-full text-sm font-bold uppercase transition-all duration-200"
                style={activePos === pos
                  ? { background: positionColors[pos], color: "#000" }
                  : { background: "#1f2937", color: "#9ca3af", border: "1px solid #374151" }}
              >
                {positionLabels[pos]} ({players.filter(p => p.position === pos).length})
              </button>
            ))}
          </div>

          {/* Player cards */}
          <div
            ref={cardsRef}
            className={cn(
              "max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 ease-out",
              cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            {filtered.map((player) => (
              <div
                key={player.number}
                className="rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{ background: "linear-gradient(160deg, #111827 0%, #1a2235 100%)" }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black border-2"
                    style={{ borderColor: positionColors[player.position], background: `${positionColors[player.position]}15`, color: positionColors[player.position], fontFamily: "Oswald, sans-serif" }}
                  >
                    {player.number}
                  </div>
                  <div className="text-right">
                    <span
                      className="text-xs font-bold uppercase px-2 py-1 rounded-full"
                      style={{ background: `${positionColors[player.position]}20`, color: positionColors[player.position] }}
                    >
                      {positionLabels[player.position]}
                    </span>
                    <div className="mt-1 text-lg">{player.flag}</div>
                  </div>
                </div>

                {/* Name */}
                <h3 className="text-xl font-black uppercase mb-0.5" style={{ fontFamily: "Oswald, sans-serif", color: "#fff" }}>
                  {player.name}
                </h3>
                <p className="text-gray-500 text-xs mb-4">{player.fullName} · {player.nationality} · {player.age} лет</p>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} style={{ color: i < player.stars ? "#FFD700" : "#374151", fontSize: "14px" }}>★</span>
                  ))}
                </div>

                {/* Stats */}
                {player.goals !== "—" && (
                  <div className="flex gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-black" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>{player.goals}</div>
                      <div className="text-xs text-gray-500">Голов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>{player.assists}</div>
                      <div className="text-xs text-gray-500">Ассистов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-black" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>{player.matches}</div>
                      <div className="text-xs text-gray-500">Матчей</div>
                    </div>
                  </div>
                )}
                {player.goals === "—" && (
                  <div className="flex gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-xl font-black" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>{player.matches}</div>
                      <div className="text-xs text-gray-500">Матчей</div>
                    </div>
                  </div>
                )}

                {/* Fact */}
                <p className="text-gray-400 text-xs leading-relaxed border-t border-gray-800 pt-4">{player.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 text-center px-4" style={{ background: "linear-gradient(135deg, #00205B 0%, #003087 100%)" }}>
        <div className="text-5xl mb-4">⚽</div>
        <h3 className="text-2xl font-black uppercase mb-2" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Hala Madrid!</h3>
        <p className="text-white/70 mb-8 max-w-md mx-auto">Вместе с лучшим составом в мире — к новым победам. Siempre adelante!</p>
        <button onClick={() => navigate("/")} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 font-semibold transition-all hover:scale-105" style={{ borderColor: "#FFD700", color: "#FFD700" }}>
          <Icon name="ArrowLeft" size={18} /> На главную
        </button>
      </section>
    </div>
  )
}
