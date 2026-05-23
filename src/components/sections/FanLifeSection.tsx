import { Trophy, Calendar, Users, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState, forwardRef } from "react"
import { useNavigate } from "react-router-dom"

export const FanLifeSection = forwardRef<HTMLElement>((_props, ref) => {
  const navigate = useNavigate()
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          if (servicesContentRef.current) {
            servicesObserver.unobserve(servicesContentRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (servicesContentRef.current) {
      servicesObserver.observe(servicesContentRef.current)
    }

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true)
          if (servicesTitleRef.current) {
            servicesTitleObserver.unobserve(servicesTitleRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (servicesTitleRef.current) {
      servicesTitleObserver.observe(servicesTitleRef.current)
    }

    return () => {
      if (servicesContentRef.current) {
        servicesObserver.unobserve(servicesContentRef.current)
      }
      if (servicesTitleRef.current) {
        servicesTitleObserver.unobserve(servicesTitleRef.current)
      }
    }
  }, [])

  return (
    <section ref={ref} id="services" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2
          ref={servicesTitleRef}
          className={cn(
            "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
            isServicesTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          Жизнь фаната
        </h2>
        <div
          ref={servicesContentRef}
          className={cn(
            "max-w-5xl mx-auto transition-all duration-1000 ease-out",
            isServicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
              <div className="flex items-center mb-4">
                <Trophy className="h-7 w-7 mr-4" style={{ color: "#FFD700" }} aria-hidden="true" />
                <h3 className="text-xl font-semibold font-heading">Матчи и результаты</h3>
              </div>
              <p className="text-gray-300">
                Актуальные результаты, расписание игр и прямые трансляции.
                Никогда не пропустишь важный матч Реала.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
              <div className="flex items-center mb-4">
                <Star className="h-7 w-7 mr-4" style={{ color: "#FFD700" }} aria-hidden="true" />
                <h3 className="text-xl font-semibold font-heading">Легенды клуба</h3>
              </div>
              <p className="text-gray-300">
                Истории великих игроков — от Ди Стефано до Роналду и Беллингема.
                Всё о звёздах, которые создали историю Реала.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
              <div className="flex items-center mb-4">
                <Users className="h-7 w-7 mr-4" style={{ color: "#FFD700" }} aria-hidden="true" />
                <h3 className="text-xl font-semibold font-heading">Фан-сообщество</h3>
              </div>
              <p className="text-gray-300">
                Общайся с тысячами болельщиков, обсуждай тактику,
                делись эмоциями после каждого матча.
              </p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 transition-all duration-300 hover:bg-gray-700">
              <div className="flex items-center mb-4">
                <Calendar className="h-7 w-7 mr-4" style={{ color: "#FFD700" }} aria-hidden="true" />
                <h3 className="text-xl font-semibold font-heading">События и встречи</h3>
              </div>
              <p className="text-gray-300">
                Совместные просмотры матчей, фан-встречи и мероприятия.
                Почувствуй атмосферу Бернабеу вместе с нами!
              </p>
            </div>
          </div>

          {/* CR7 Banner */}
          <div
            className="mt-10 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
            style={{ background: "linear-gradient(135deg, #00205B 0%, #003087 60%, #FFD70020 100%)", border: "2px solid #FFD700" }}
            onClick={() => navigate("/ronaldo")}
          >
            <div
              className="flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black border-4"
              style={{ borderColor: "#FFD700", background: "#00205B", color: "#FFD700", fontFamily: "Oswald, sans-serif" }}
            >
              CR7
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black uppercase mb-1" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>
                Криштиану Роналду
              </h3>
              <p className="text-gray-300 text-sm">450 голов · 16 трофеев · Легенда Реал Мадрида · 2009–2018</p>
            </div>
            <div className="md:ml-auto flex items-center gap-2 text-sm font-semibold" style={{ color: "#FFD700" }}>
              Все трофеи →
            </div>
          </div>

          {/* Legends grid */}
          <div className="mt-16">
            <h2 className="text-center text-3xl font-black uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Легенды клуба</h2>
            <p className="text-center text-gray-400 mb-10">Игроки, вошедшие в историю Реал Мадрида</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { badge: "ZZ", name: "Зинедин Зидан", sub: "155 матчей · Игрок + тренер", path: "/zidane" },
                { badge: "7", name: "Рауль Гонсалес", sub: "741 матч · 323 гола · Капитан", path: "/raul" },
                { badge: "RC3", name: "Роберто Карлос", sub: "527 матчей · Лучший левый защ.", path: "/roberto-carlos" },
                { badge: "4", name: "Серхио Рамос", sub: "671 матч · 22 трофея · Капитан", path: "/ramos" },
                { badge: "3", name: "Пепе", sub: "334 матча · 14 трофеев · Защитник", path: "/pepe" },
                { badge: "CR7", name: "Криштиану Роналду", sub: "438 матчей · 450 голов · Бомбардир", path: "/ronaldo" },
              ].map((legend) => (
                <div
                  key={legend.path}
                  onClick={() => navigate(legend.path)}
                  className="flex items-center gap-4 rounded-xl p-5 border border-gray-800 hover:border-yellow-500 cursor-pointer transition-all duration-300 hover:scale-105"
                  style={{ background: "#111827" }}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-lg font-black border-2" style={{ borderColor: "#FFD700", background: "#00205B", color: "#FFD700", fontFamily: "Oswald, sans-serif" }}>
                    {legend.badge}
                  </div>
                  <div>
                    <div className="font-bold text-white">{legend.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{legend.sub}</div>
                  </div>
                  <div className="ml-auto text-gray-600 hover:text-yellow-400 transition-colors">→</div>
                </div>
              ))}
            </div>

            {/* News & Schedule Banner */}
            <div
              onClick={() => navigate("/news")}
              className="mt-8 rounded-2xl p-7 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0f0f2d 60%, #00BFFF15 100%)", border: "2px solid #00BFFF" }}
            >
              <div className="flex gap-2 text-4xl">📅📰</div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black uppercase mb-1" style={{ fontFamily: "Oswald, sans-serif", color: "#00BFFF" }}>Матчи и Новости</h3>
                <p className="text-gray-300 text-sm">Расписание игр · Свежие новости · Сезон 2024–25</p>
              </div>
              <div className="md:ml-auto text-sm font-semibold" style={{ color: "#00BFFF" }}>Смотреть →</div>
            </div>

            {/* Squad Banner */}
            <div
              onClick={() => navigate("/squad")}
              className="mt-4 rounded-2xl p-7 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              style={{ background: "linear-gradient(135deg, #0a1a0a 0%, #0f2d0f 60%, #7CFC0015 100%)", border: "2px solid #7CFC00" }}
            >
              <div className="text-5xl">👑</div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black uppercase mb-1" style={{ fontFamily: "Oswald, sans-serif", color: "#7CFC00" }}>Текущий состав</h3>
                <p className="text-gray-300 text-sm">Мбаппе · Беллингем · Виниус · Модрич · Кроос · Куртуа</p>
              </div>
              <div className="md:ml-auto text-sm font-semibold" style={{ color: "#7CFC00" }}>Смотреть →</div>
            </div>

            {/* Victories Banner */}
            <div
              onClick={() => navigate("/victories")}
              className="mt-4 rounded-2xl p-7 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
              style={{ background: "linear-gradient(135deg, #1a1000 0%, #2d1e00 60%, #FFD70015 100%)", border: "2px solid #FFD700" }}
            >
              <div className="text-5xl">🏆</div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black uppercase mb-1" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Великие победы Реала</h3>
                <p className="text-gray-300 text-sm">15 Лиг Чемпионов · 36 чемпионств · Клуб Века по версии ФИФА</p>
              </div>
              <div className="md:ml-auto text-sm font-semibold" style={{ color: "#FFD700" }}>Смотреть →</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

FanLifeSection.displayName = "FanLifeSection"
