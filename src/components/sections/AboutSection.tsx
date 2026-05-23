import { BotIcon as Robot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"
import { forwardRef } from "react"

interface AboutSectionProps {
  onScrollToContact: () => void
  onOpenChatbot: () => void
}

export const AboutSection = forwardRef<HTMLElement, AboutSectionProps>(
  ({ onScrollToContact, onOpenChatbot }, ref) => {
    const [isAboutVisible, setIsAboutVisible] = useState(false)
    const aboutContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const aboutObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsAboutVisible(true)
            if (aboutContentRef.current) {
              aboutObserver.unobserve(aboutContentRef.current)
            }
          }
        },
        { threshold: 0.1 },
      )

      if (aboutContentRef.current) {
        aboutObserver.observe(aboutContentRef.current)
      }

      return () => {
        if (aboutContentRef.current) {
          aboutObserver.unobserve(aboutContentRef.current)
        }
      }
    }, [])

    return (
      <section ref={ref} id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div
                className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 flex-shrink-0 flex items-center justify-center text-8xl"
                style={{ borderColor: "#FFD700", background: "linear-gradient(135deg, #003087 0%, #00205B 100%)" }}
              >
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
                      onClick={onScrollToContact}
                      variant="outline"
                      size="sm"
                      className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors w-[160px] mx-auto sm:mx-0"
                    >
                      Вступить в клуб
                    </Button>
                    <Button
                      onClick={onOpenChatbot}
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
    )
  }
)

AboutSection.displayName = "AboutSection"
