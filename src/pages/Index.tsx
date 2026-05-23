import { useState, useRef } from "react"
import { ChatbotModal } from "@/components/ChatbotModal"
import { HeroSection } from "@/components/sections/HeroSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { FanLifeSection } from "@/components/sections/FanLifeSection"
import { ContactSection } from "@/components/sections/ContactSection"

export default function Index() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const aboutSectionRef = useRef<HTMLElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const contactSectionRef = useRef<HTMLElement>(null)

  const scrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const scrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen">
      <HeroSection onScrollToAbout={scrollToAbout} onScrollToContact={scrollToContact} />
      <AboutSection ref={aboutSectionRef} onScrollToContact={scrollToContact} onOpenChatbot={() => setIsChatbotOpen(true)} />
      <FanLifeSection ref={servicesSectionRef} />
      <ContactSection ref={contactSectionRef} />
      <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </div>
  )
}
