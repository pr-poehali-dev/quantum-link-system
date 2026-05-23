import { StarField } from "@/components/StarField"
import { ChevronDown, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

interface HeroSectionProps {
  onScrollToAbout: () => void
  onScrollToContact: () => void
}

export function HeroSection({ onScrollToAbout, onScrollToContact }: HeroSectionProps) {
  const [blurAmount, setBlurAmount] = useState(0)
  const [initialHeight, setInitialHeight] = useState(0)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const maxBlur = 8
          const triggerHeight = initialHeight * 1.2
          const newBlurAmount = Math.min(maxBlur, (scrollRef.current / triggerHeight) * maxBlur)

          setBlurAmount(newBlurAmount)

          lastScrollRef.current = scrollRef.current
          ticking.current = false
        })

        ticking.current = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [initialHeight])

  const scaleFactor = 1 + blurAmount / 16
  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out",
  }
  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  return (
    <section className="relative w-full overflow-hidden bg-black" style={heroStyle}>
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
          onClick={onScrollToContact}
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
              onClick={onScrollToAbout}
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
          onClick={onScrollToAbout}
          role="button"
          aria-label="Перейти к разделу о нас"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onScrollToAbout()
            }
          }}
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </div>
      </div>
    </section>
  )
}
