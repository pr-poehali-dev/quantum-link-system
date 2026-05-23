import { StarField } from "@/components/StarField"
import { ChevronDown, Instagram, Trophy, Calendar, Users, Star, BotIcon as Robot } from "lucide-react"
import { ContactForm } from "@/components/ContactForm"
import { ChatbotModal } from "@/components/ChatbotModal"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Index() {
  const navigate = useNavigate()
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [isServicesVisible, setIsServicesVisible] = useState(false)
  const [isServicesTitleVisible, setIsServicesTitleVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [initialHeight, setInitialHeight] = useState(0)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const servicesContentRef = useRef<HTMLDivElement>(null)
  const servicesTitleRef = useRef<HTMLHeadingElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  // Store initial height on first render
  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  // Handle scroll events to calculate blur amount
  useEffect(() => {
    const handleScroll = () => {
      // Store the current scroll position
      scrollRef.current = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // Calculate blur based on scroll position
          // Reduced max blur from 20px to 8px for a more subtle effect
          const maxBlur = 8
          // Increased trigger height to make the effect develop more slowly
          const triggerHeight = initialHeight * 1.2
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)

          setBlurAmount(newBlurAmount)

          // Update last scroll position for next comparison
          lastScrollRef.current = scrollRef.current
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [initialHeight])

  // Intersection observer for visibility
  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true)
          // Once visible, no need to observe anymore
          if (headingRef.current) {
            headingObserver.unobserve(headingRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (headingRef.current) {
      headingObserver.observe(headingRef.current)
    }

    const aboutObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAboutVisible(true)
          // Once visible, no need to observe anymore
          if (aboutContentRef.current) {
            aboutObserver.unobserve(aboutContentRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (aboutContentRef.current) {
      aboutObserver.observe(aboutContentRef.current)
    }

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesVisible(true)
          // Once visible, no need to observe anymore
          if (servicesContentRef.current) {
            servicesObserver.unobserve(servicesContentRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (servicesContentRef.current) {
      servicesObserver.observe(servicesContentRef.current)
    }

    const servicesTitleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsServicesTitleVisible(true)
          // Once visible, no need to observe anymore
          if (servicesTitleRef.current) {
            servicesTitleObserver.unobserve(servicesTitleRef.current)
          }
        }
      },
      {
        threshold: 0.1,
      },
    )

    if (servicesTitleRef.current) {
      servicesTitleObserver.observe(servicesTitleRef.current)
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current)
      }
      if (aboutContentRef.current) {
        aboutObserver.unobserve(aboutContentRef.current)
      }
      if (servicesContentRef.current) {
        servicesObserver.unobserve(servicesContentRef.current)
      }
      if (servicesTitleRef.current) {
        servicesTitleObserver.unobserve(servicesTitleRef.current)
      }
    }
  }, [])

  // Calculate scale factor based on blur amount
  // Maintain the same scaling effect even with reduced blur
  const scaleFactor = 1 + blurAmount / 16 // Adjusted to maintain similar scaling with reduced blur

  // Add a warp speed effect to stars based on blur amount
  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out", // Slightly longer transition for smoother effect
  }

  // Scroll to about section
  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Scroll to contact section
  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Open chatbot modal
  const openChatbot = () => {
    setIsChatbotOpen(true)
  }

  // Close chatbot modal
  const closeChatbot = () => {
    setIsChatbotOpen(false)
  }

  // Use fixed height for hero section based on initial viewport height
  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  return (
    <div className="min-h-screen">
      <section className="relative w-full overflow-hidden bg-black" style={heroStyle}>
        {/* Navigation links in top right corner */}
        <div className="absolute top-6 right-6 z-10 flex space-x-3">
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Наш Instagram"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white bg-transparent text-white transition-colors hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
          >
            <Instagram className="h-5 w-5" />
          </a>

          <Button
            onClick={scrollToContact}
            variant="outline"
            size="sm"
            className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
          >
            Контакты
          </Button>
        </div>

        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div
              className="backdrop-blur-sm px-6 py-4 rounded-lg inline-block relative"
              style={{
                background: "radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)",
              }}
            >
              <h1 className="text-4xl font-bold text-white md:text-6xl font-heading">
                Hala Madrid{" "}
                <span role="img" aria-label="football">
                  ⚽
                </span>
              </h1>
              <p className="mt-4 text-lg text-gray-300 md:text-xl px-4 max-w-xs mx-auto md:max-w-none">
                Сообщество настоящих фанатов Реал Мадрида
              </p>
              <Button
                onClick={scrollToAbout}
                variant="outline"
                size="sm"
                className="mt-6 bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors"
              >
                О нас
              </Button>
            </div>
          </div>

          <div
            className="absolute bottom-20 animate-bounce cursor-pointer"
            onClick={scrollToAbout}
            role="button"
            aria-label="Перейти к разделу о нас"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToAbout()
              }
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      <section ref={aboutSectionRef} id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 flex-shrink-0 flex items-center justify-center text-8xl"
                style={{ borderColor: "#FFD700", background: "linear-gradient(135deg, #003087 0%, #00205B 100%)" }}>
                ⚽
              </div>
              <div className="space-y-4 text-center md:text-left px-4 md:px-0">
                <h2 className="text-3xl font-bold font-heading">О нас</h2>
                <div className="space-y-4 max-w-2xl">
                  <p className="text-gray-300">
                    Мы — фанаты Реал Мадрида, объединённые любовью к величайшему клубу мира. 
                    Здесь живёт настоящая страсть к игре, Бернабеу и бело-золотым цветам.
                  </p>
                  <p className="text-gray-300">
                    Следим за каждым матчем, обсуждаем составы, делимся новостями и живём 
                    каждым голом. Реал — это не просто клуб, это образ жизни.
                  </p>
                  <p className="text-gray-300">
                    Присоединяйся к нашему сообществу болельщиков — вместе мы громче, 
                    вместе мы сильнее. Hala Madrid y nada más!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center md:justify-start">
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                    <Button
                      onClick={scrollToContact}
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[160px] mx-auto sm:mx-0"
                    >
                      Вступить в клуб
                    </Button>
                    <Button
                      onClick={openChatbot}
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[160px] mx-auto sm:mx-0 flex items-center justify-center"
                    >
                      <Robot className="mr-1 h-4 w-4" />
                      Фан-чат
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref={servicesSectionRef} id="services" className="py-20 bg-gray-900 text-white">
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
          </div>
        </div>
      </section>

      {/* Legends Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl font-black uppercase mb-4" style={{ fontFamily: "Oswald, sans-serif", color: "#FFD700" }}>Легенды клуба</h2>
          <p className="text-center text-gray-400 mb-10">Игроки, вошедшие в историю Реал Мадрида</p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Victories Banner */}
          <div
            onClick={() => navigate("/victories")}
            className="mt-8 max-w-5xl mx-auto rounded-2xl p-7 flex flex-col md:flex-row items-center gap-6 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
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
      </section>

      <section ref={contactSectionRef} id="contact" className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2
            ref={headingRef}
            className={cn(
              "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out",
              isHeadingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Вступить в сообщество
          </h2>
          <ContactForm />
        </div>
      </section>

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatbotOpen} onClose={closeChatbot} />
    </div>
  )
}