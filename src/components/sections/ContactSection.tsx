import { ContactForm } from "@/components/ContactForm"
import { cn } from "@/lib/utils"
import { useEffect, useRef, useState, forwardRef } from "react"

export const ContactSection = forwardRef<HTMLElement>((_props, ref) => {
  const [isHeadingVisible, setIsHeadingVisible] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true)
          if (headingRef.current) {
            headingObserver.unobserve(headingRef.current)
          }
        }
      },
      { threshold: 0.1 },
    )

    if (headingRef.current) {
      headingObserver.observe(headingRef.current)
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current)
      }
    }
  }, [])

  return (
    <section ref={ref} id="contact" className="bg-gray-100 py-16">
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
  )
})

ContactSection.displayName = "ContactSection"
