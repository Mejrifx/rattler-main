"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Instagram, ExternalLink, X, ShoppingCart, Menu } from "lucide-react"

export default function RattlerLandingPage() {

  const [scrollY, setScrollY] = useState(0)
  const [heroVisible, setHeroVisible] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [visibleImages, setVisibleImages] = useState(() => {
    // Mobile: 2 columns × 4 rows = 8 images
    // Desktop: 5 columns × 3 rows = 15 images
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 8 : 15
    }
    return 15 // Default for SSR
  })
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [audioStarted, setAudioStarted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const heroTextRef = useRef<HTMLDivElement>(null)
  const journeyTitleRef = useRef<HTMLHeadingElement>(null)
  const journeyTextRef = useRef<HTMLDivElement>(null)
  const tokenomicsTitleRef = useRef<HTMLHeadingElement>(null)
  const galleryTitleRef = useRef<HTMLHeadingElement>(null)
  const memedepotTitleRef = useRef<HTMLHeadingElement>(null)
  const adventureTitleRef = useRef<HTMLHeadingElement>(null)
  const adventureTextRef = useRef<HTMLDivElement>(null)
  const joinTitleRef = useRef<HTMLHeadingElement>(null)
  const whyChooseTitleRef = useRef<HTMLHeadingElement>(null)
  const finalCtaRef = useRef<HTMLHeadingElement>(null)

  const galleryImages = [
    "/Rattler Confused.jpg",
    "/Rattler Eating.jpg",
    "/Rattler Gun.jpg",
    "/Rattler Hissing.jpg",
    "/Rattler Middlefinger.jpg",
    "/Rattler On Phone.jpg",
    "/Rattler Opening Door.jpg",
    "/Rattler Painting.jpg",
    "/Rattler Pouring Coffee.jpg",
    "/Rattler Reading.jpg",
    "/Rattler Scratching Head.jpg",
    "/Rattler Singing.jpg",
    "/Rattler Sippin Wine.jpg",
    "/Rattler Sipping Coffee.jpg",
    "/Rattler Snake Game.jpg",
    "/Rattler With a Key.jpg",
    "/Rattler Yawning.jpg",
    "/rattler-coffee.png",
  ]

  useEffect(() => {
    // Throttled scroll handler for better performance
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          // Show nav at top, hide when scrolling down
          setIsNavVisible(window.scrollY < 100)
          ticking = false
        })
        ticking = true
      }
    }

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const animateElement = (element: HTMLElement, delay = 0) => {
      setTimeout(() => {
        element.style.transform = "translateY(0) translateX(0)"
        element.style.opacity = "1"
        element.style.transition = "all 0.4s ease-out" // Faster transitions
      }, delay)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement

          if (element === heroTextRef.current) {
            // Reduced stagger for hero elements
            const children = element.children
            Array.from(children).forEach((child, index) => {
              animateElement(child as HTMLElement, index * 100) // Reduced from 200ms
            })
          } else if (element === journeyTextRef.current) {
            // Reduced stagger for journey text
            const paragraphs = element.querySelectorAll("p, .badge-container")
            paragraphs.forEach((p, index) => {
              animateElement(p as HTMLElement, index * 150) // Reduced from 300ms
            })
          } else if (element === adventureTextRef.current) {
            // Reduced stagger for adventure text
            const paragraphs = element.querySelectorAll("p")
            paragraphs.forEach((p, index) => {
              animateElement(p as HTMLElement, index * 150) // Reduced from 300ms
            })
          } else {
            // Standard slide-in animation for titles
            animateElement(element)
          }
          
          // Unobserve after animation to reduce ongoing work
          observer.unobserve(element)
        }
      })
    }, observerOptions)

    // Observe all elements
    const elements = [
      heroTextRef.current,
      journeyTitleRef.current,
      journeyTextRef.current,
      tokenomicsTitleRef.current,
      galleryTitleRef.current,
      memedepotTitleRef.current,
      adventureTitleRef.current,
      adventureTextRef.current,
      joinTitleRef.current,
      whyChooseTitleRef.current,
      finalCtaRef.current,
    ]

    elements.forEach((el) => {
      if (el) observer.observe(el)
    })

    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Trigger hero animation on load
    setTimeout(() => setHeroVisible(true), 300) // Reduced from 500ms

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observer.disconnect()
    }
  }, [])



  const showCopyNotification = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  const loadMoreImages = () => {
    setVisibleImages(galleryImages.length) // Show all remaining images when clicked
  }

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Start audio on user interaction
  const startAudio = () => {
    if (audioRef.current && !audioStarted) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e))
      setAudioStarted(true)
    }
  }

  // Add click listener to start audio on any user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      startAudio()
      // Remove listener after first interaction
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }

    document.addEventListener('click', handleUserInteraction)
    document.addEventListener('keydown', handleUserInteraction)
    document.addEventListener('touchstart', handleUserInteraction)

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
    }
  }, [])

  // Handle window resize to update visible images for responsive design
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setVisibleImages(isMobile ? 8 : 15)
    }

    // Set initial value
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const TokenomicsCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
    <Card className="bg-transparent border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:scale-105">
      <CardContent className="p-6 text-center">
        <h3 className="text-2xl font-bold text-lime-400 mb-2" style={{ fontFamily: "'Orbitron', monospace", textShadow: "0 0 20px rgba(132, 204, 22, 0.5)" }}>{value}</h3>
        <p className="text-white font-semibold mb-1">{title}</p>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  )

  const SocialButton = ({ icon: Icon, label, href }: { icon: any; label: string; href: string }) => (
    <Button
      variant="outline"
      size="lg"
      className="bg-black/60 border-green-500/50 text-lime-400 hover:bg-green-500/20 hover:border-lime-400 hover:text-lime-300 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
      asChild
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <Icon className="w-5 h-5 mr-2" />
        {label}
      </a>
    </Button>
  )

  return (
    <div className="min-h-screen text-white overflow-x-hidden relative" style={{ fontFamily: "'Orbitron', 'Courier New', monospace" }}>
      {/* Background music - starts on user interaction */}
      <audio
        ref={audioRef}
        loop
        muted={false}
        className="hidden"
        preload="auto"
        volume={0.3}
      >
        <source src="/Rattler Lofi.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Social Icons */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col gap-3">
        {/* Telegram Button */}
        <a
          href="https://t.me/rtrabs"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-12 h-12 bg-black/80 backdrop-blur-lg border border-green-400/50 rounded-full flex items-center justify-center hover:bg-green-500/20 hover:border-green-300 hover:scale-110 transition-all duration-300"
          style={{
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 197, 94, 0.2)"
          }}
        >
          <Send className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
        </a>

        {/* X (Twitter) Button */}
        <a
          href="https://x.com/RattlerOnAbs"
          target="_blank"
          rel="noopener noreferrer"
          className="group w-12 h-12 bg-black/80 backdrop-blur-lg border border-green-400/50 rounded-full flex items-center justify-center hover:bg-green-500/20 hover:border-green-300 hover:scale-110 transition-all duration-300"
          style={{
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 197, 94, 0.2)"
          }}
        >
          <X className="w-5 h-5 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
        </a>
      </div>

      {/* Audio prompt for first-time visitors */}
      {!audioStarted && (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 backdrop-blur-lg border border-green-400/50 rounded-2xl p-4 text-center max-w-sm">
          <p className="text-green-400 text-sm mb-2" style={{ fontFamily: "'Orbitron', monospace" }}>
            🎵 Click anywhere to start the Rattler Lofi experience
          </p>
          <div className="w-full h-1 bg-green-900/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-lime-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      )}
      {/* Copy Notification */}
      <div
        className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
          showNotification 
            ? "opacity-100 translate-y-0 scale-100" 
            : "opacity-0 -translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div 
          className="bg-black/90 backdrop-blur-lg border border-green-400/50 rounded-2xl px-8 py-4 shadow-2xl"
          style={{
            boxShadow: "0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(132, 204, 22, 0.4)",
          }}
        >
          <p 
            className="text-green-400 font-bold text-lg"
            style={{ 
              fontFamily: "'Orbitron', monospace",
              textShadow: "0 0 20px rgba(34, 197, 94, 0.8)"
            }}
          >
            Contract Address Copied
          </p>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        isNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => scrollToSection('hero')}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden group-hover:scale-110 transition-all duration-300 border-2 border-green-400/50 group-hover:border-green-300">
                <img 
                  src="/rattler-head.png" 
                  alt="Rattler Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-lime-300 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.8)] transition-all duration-300" style={{ fontFamily: "'Orbitron', monospace" }}>
                RATTLER
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'About', target: 'about' },
                { label: 'How to Buy', target: 'howtobuy' },
                { label: 'Gallery', target: 'gallery' },
                { label: 'Community', target: 'community' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.target)}
                  className="relative px-4 py-2 text-gray-300 hover:text-lime-400 transition-all duration-300 group"
                >
                  <span className="relative z-10 font-medium">{item.label}</span>
                  {/* Hover underline effect */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-lime-300 group-hover:w-full transition-all duration-300"></div>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
                    background: "radial-gradient(circle at center, rgba(34, 197, 94, 0.1) 0%, transparent 70%)",
                    boxShadow: "0 0 20px rgba(34, 197, 94, 0.2)"
                  }}></div>
                </button>
              ))}
            </div>

            {/* Desktop CTA Button */}
            <Button
              className="hidden md:block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 shadow-lg border border-green-400/30 backdrop-blur-sm"
              style={{
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)"
              }}
              asChild
            >
              <a href="https://portal.abs.xyz/trade?buy=0xc3882e7ce4d62bb571a6f417419c4e0ecb82d944&showChart=true&showHistory=true" target="_blank" rel="noopener noreferrer">
                Buy $RTR
              </a>
            </Button>

            {/* Mobile Hamburger Menu */}
            <button
              className="md:hidden p-2 text-gray-300 hover:text-lime-400 transition-all duration-300 group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="relative">
                <Menu className="w-6 h-6 transition-all duration-300" />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300" style={{
                  background: "radial-gradient(circle at center, rgba(34, 197, 94, 0.2) 0%, transparent 70%)",
                  boxShadow: "0 0 15px rgba(34, 197, 94, 0.3)"
                }}></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div className={`md:hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen 
              ? "max-h-96 opacity-100 visible" 
              : "max-h-0 opacity-0 invisible"
          } overflow-hidden`}>
            <div className={`px-4 py-6 space-y-4 bg-black/40 backdrop-blur-lg rounded-2xl mt-4 border border-green-500/20 transition-all duration-500 ease-in-out ${
              isMobileMenuOpen 
                ? "transform translate-y-0 scale-100" 
                : "transform -translate-y-4 scale-95"
            }`}>
              {[
                { label: 'About', target: 'about' },
                { label: 'How to Buy', target: 'howtobuy' },
                { label: 'Gallery', target: 'gallery' },
                { label: 'Community', target: 'community' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    scrollToSection(item.target)
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-lime-400 transition-all duration-300 rounded-lg hover:bg-green-500/10 border border-transparent hover:border-green-400/30"
                >
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              
              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-green-500/20">
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-black font-bold py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg border border-green-400/30"
                  style={{
                    boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)"
                  }}
                  asChild
                >
                  <a href="https://portal.abs.xyz/trade?buy=0xc3882e7ce4d62bb571a6f417419c4e0ecb82d944&showChart=true&showHistory=true" target="_blank" rel="noopener noreferrer">
                    Buy $RTR
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation background with blur */}
        <div className="absolute inset-0 -z-10 bg-black/20 backdrop-blur-md border-b border-green-500/20"></div>
      </nav>

      {/* Consistent Background Layer */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-green-950 to-black"></div>
        
        {/* Simplified static glow orbs - much better performance */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 bg-emerald-500/8 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-lime-500/6 rounded-full blur-lg"></div>
        
        {/* Subtle moving gradients */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-green-900/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-green-900/20 to-transparent"></div>
          <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-emerald-900/15 to-transparent"></div>
          <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-emerald-900/15 to-transparent"></div>
        </div>
        
        {/* Snake pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #16a34a 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, #15803d 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 40px 40px',
          animation: 'snake-pattern 20s linear infinite'
        }}></div>
      </div>
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-20 overflow-hidden">
        {/* Background Image with Blending */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
          style={{
            backgroundImage: "url('/rattler-mainbg.jpg')",
            transform: `translateY(${scrollY * 0.15}px)`, // Reduced parallax intensity
            scale: "1.05" // Reduced scale
          }}
        />
        
        {/* Multiple Overlay Layers for Seamless Integration */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-green-950/60 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/40 via-transparent to-green-800/40" />
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 40%, #16a34a 0%, transparent 60%), radial-gradient(circle at 70% 60%, #15803d 0%, transparent 60%)",
          }}
        />
        
        {/* Simplified Snake-themed Static Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/12 rounded-full blur-xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-xl" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-lime-500/8 rounded-full blur-lg" />

        {/* Mobile-only: Title at top */}
        <div className="md:hidden text-center z-20 max-w-4xl mx-auto relative pt-6 mb-8">
          <h1
            className={`text-3xl font-bold mb-12 bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent transition-all duration-1200 ease-out relative ${
              heroVisible 
                ? "opacity-100 transform translate-x-0" 
                : "opacity-0 transform -translate-x-full"
            }`}
            style={{
              transitionDelay: "0.2s",
              textShadow: "0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(132, 204, 22, 0.4), 0 0 120px rgba(16, 185, 129, 0.3)",
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.7))",
              fontFamily: "'Orbitron', monospace",
              letterSpacing: "0.05em"
            }}
          >
            Welcome to Rattler's World
            {/* Neon glow underline */}
            <div 
              className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-lime-400 to-transparent transition-all duration-1200 ease-out ${
                heroVisible ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
              style={{
                transitionDelay: "0.6s",
                boxShadow: "0 0 10px rgba(132, 204, 22, 0.8), 0 0 20px rgba(132, 204, 22, 0.6), 0 0 30px rgba(132, 204, 22, 0.4)"
              }}
            ></div>
          </h1>


        </div>

        <div ref={heroTextRef} className="text-center z-20 max-w-4xl mx-auto relative flex flex-col justify-between min-h-[calc(100vh-16rem)] md:min-h-0 md:block">
          
          {/* Text Content - Mobile: Modified, Desktop: Same */}
          <div className="flex-1 flex flex-col justify-center md:block">
            {/* Desktop-only title */}
            <h1
              className={`hidden md:block text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-green-400 via-lime-400 to-emerald-400 bg-clip-text text-transparent transition-all duration-1200 ease-out relative ${
                heroVisible 
                  ? "opacity-100 transform translate-x-0" 
                  : "opacity-0 transform -translate-x-full"
              }`}
              style={{
                transitionDelay: "0.2s",
                textShadow: "0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(132, 204, 22, 0.4), 0 0 120px rgba(16, 185, 129, 0.3)",
                filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.7))",
                fontFamily: "'Orbitron', monospace",
                letterSpacing: "0.05em"
              }}
            >
              Welcome to Rattler's World
              {/* Neon glow underline */}
              <div 
                className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent transition-all duration-1200 ease-out ${
                  heroVisible ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
                style={{
                  transitionDelay: "0.6s",
                  boxShadow: "0 0 15px rgba(132, 204, 22, 0.8), 0 0 30px rgba(132, 204, 22, 0.6), 0 0 45px rgba(132, 204, 22, 0.4)"
                }}
              ></div>
            </h1>

            <p
              className={`text-lg md:text-xl lg:text-2xl text-green-100 mb-2 md:mb-6 leading-relaxed transition-all duration-1000 ease-out ${
                heroVisible 
                  ? "opacity-100 transform translate-x-0" 
                  : "opacity-0 transform translate-x-full"
              }`}
              style={{
                transitionDelay: "0.4s",
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.8), 0 0 20px rgba(34, 197, 94, 0.3)",
                filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))",
                fontFamily: "'Courier New', monospace"
              }}
            >
              The most venomous meme coin on Abstract Chain with lightning-fast strikes and endless possibilities
            </p>

            {/* Snake-themed animated subtitle */}
            <div
              className={`text-base md:text-lg text-lime-400 font-semibold mb-6 md:mb-0 transition-all duration-800 ease-out ${
                heroVisible 
                  ? "opacity-100 transform translate-y-0" 
                  : "opacity-0 transform translate-y-8"
              }`}
              style={{
                transitionDelay: "0.6s",
                textShadow: "0 0 30px rgba(132, 204, 22, 0.6), 0 0 60px rgba(34, 197, 94, 0.4), 0 2px 8px rgba(0, 0, 0, 0.9)",
                filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.7))",
                fontFamily: "'Orbitron', monospace",
                letterSpacing: "0.1em"
              }}
            >
              Strike Fast, Strike Hard, Strike $RTR
            </div>
          </div>

          {/* Buttons - Mobile: Bottom with more spacing, Desktop: Below text with margin */}
          <div
            className={`mt-auto md:mt-8 flex flex-col sm:flex-row gap-6 md:gap-4 justify-center transition-all duration-1000 ease-out ${
              heroVisible 
                ? "opacity-100 transform translate-y-0" 
                : "opacity-0 transform translate-y-16"
            }`}
            style={{
              transitionDelay: "0.8s"
            }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-lg md:text-xl hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur-sm border border-green-400/30"
              style={{
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)",
                fontFamily: "'Orbitron', monospace"
              }}
              aria-label="Buy RTR token"
              onClick={() => window.open('https://portal.abs.xyz/trade?buy=0xc3882e7ce4d62bb571a6f417419c4e0ecb82d944&showChart=true&showHistory=true', '_blank')}
            >
              Buy $RTR
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-lg md:text-xl hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur-sm border border-emerald-400/30"
              style={{
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.2)",
                fontFamily: "'Orbitron', monospace"
              }}
              aria-label="Copy contract address"
              onClick={() => {
                navigator.clipboard.writeText('0xc3882E7ce4D62bb571A6f417419C4E0ecB82d944')
                showCopyNotification()
              }}
            >
              Copy CA
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-lime-600 to-green-600 hover:from-lime-700 hover:to-green-700 text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-full text-lg md:text-xl hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur-sm border border-lime-400/30"
              style={{
                boxShadow: "0 0 30px rgba(132, 204, 22, 0.4), 0 0 60px rgba(132, 204, 22, 0.2)",
                fontFamily: "'Orbitron', monospace"
              }}
              aria-label="Explore Rattler"
              onClick={() => window.open('https://dexscreener.com/abstract/0xba0f1818bc028eda1c44792ac361c4cedd804c3b', '_blank')}
            >
              Explore Rattler
            </Button>
          </div>
        </div>
      </section>

      {/* About Rattler Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
              <h2
                ref={journeyTitleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-green-400 mb-6 animate-slide-right opacity-0"
              style={{
                transform: "translateX(-100px)",
                fontFamily: "'Orbitron', monospace",
                textShadow: "0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(132, 204, 22, 0.4)",
                letterSpacing: "0.02em"
              }}
            >
              About Rattler
              </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent mx-auto mb-4"></div>
          </div>

          {/* Story Panels */}
          <div className="grid gap-8 md:gap-12">
            {/* Panel 1 */}
            <div 
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        entry.target.style.transform = "translateY(0) translateX(0)"
                        entry.target.style.opacity = "1"
                      }
                    })
                  }, { threshold: 0.2 })
                  observer.observe(el)
                }
              }}
              className="bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-4 md:p-8 lg:p-10 max-w-4xl mx-auto transition-all duration-700 ease-out opacity-0"
              style={{ 
                transform: "translateY(50px) translateX(-30px)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7), 0 0 40px rgba(34, 197, 94, 0.2)"
              }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-green-100 leading-relaxed">
                <strong className="text-lime-400 text-xl md:text-2xl lg:text-3xl">The First Snake Of Abstract 🐍</strong>
                <br /><br />
                RATTLER / RTR the notorious and most feared Africa's Venomous snake with a grudge in his heart for whoever killed its parents. Someone from Abstract chain who knew all the culprits summoned RTR to take its revenge while that guy smartly plays the divide and conquer game as Rattler poisons / chokes all the competition 😈
              </p>
            </div>

            {/* Panel 2 */}
            <div 
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        setTimeout(() => {
                          entry.target.style.transform = "translateY(0) translateX(0)"
                          entry.target.style.opacity = "1"
                        }, 150)
                      }
                    })
                  }, { threshold: 0.2 })
                  observer.observe(el)
                }
              }}
              className="bg-black/80 backdrop-blur-lg border border-green-500/30 rounded-2xl p-4 md:p-8 lg:p-10 max-w-4xl mx-auto ml-auto transition-all duration-700 ease-out opacity-0"
              style={{ 
                transform: "translateY(50px) translateX(30px)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7), 0 0 40px rgba(34, 197, 94, 0.2)"
              }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-green-100 leading-relaxed">
                RATTLER with an obsessive desire for evil and menace jumped at this opportunity in reaching the penguin land, his hatred grew far more worse when he realized those penguins didn't only killed its parents but have also taken over the entire chain and not allowing new players a fair chance.
              </p>
            </div>

            {/* Panel 3 - Highlight Panel */}
            <div 
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        setTimeout(() => {
                          entry.target.style.transform = "translateY(0) scale(1)"
                          entry.target.style.opacity = "1"
                        }, 300)
                      }
                    })
                  }, { threshold: 0.2 })
                  observer.observe(el)
                }
              }}
              className="bg-gradient-to-br from-green-900/30 to-lime-900/30 backdrop-blur-sm border border-lime-400/30 rounded-2xl p-4 md:p-8 lg:p-10 max-w-5xl mx-auto transition-all duration-800 ease-out opacity-0"
              style={{ 
                transform: "translateY(60px) scale(0.95)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 60px rgba(132, 204, 22, 0.3)"
              }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed text-center">
                <strong className="text-lime-300 text-xl md:text-2xl lg:text-3xl">RTR plans to eat them all, take its revenge & serve justice to the green chain 🫰</strong>
                <br /><br />
                <span className="text-yellow-300">Nothing can save the penguins now! 🐧</span>
              </p>
              </div>

            {/* Panel 4 - Warning Panel */}
            <div 
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        setTimeout(() => {
                          entry.target.style.transform = "translateY(0) translateX(0)"
                          entry.target.style.opacity = "1"
                        }, 450)
                      }
                    })
                  }, { threshold: 0.2 })
                  observer.observe(el)
                }
              }}
              className="bg-red-900/20 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4 md:p-8 lg:p-10 max-w-4xl mx-auto transition-all duration-700 ease-out opacity-0"
              style={{ 
                transform: "translateY(50px) translateX(-25px)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 40px rgba(239, 68, 68, 0.3)"
              }}
            >
              <p className="text-xl md:text-2xl text-red-100 leading-relaxed">
                But keep in mind that a snake can never be your friend, and will always betray once they conquer, Rattler at some point might come for his head too 👀
              </p>
            </div>

            {/* Panel 5 - Mystery Panel */}
            <div 
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        setTimeout(() => {
                          entry.target.style.transform = "translateY(0) translateX(0) rotate(0deg)"
                          entry.target.style.opacity = "1"
                        }, 600)
                      }
                    })
                  }, { threshold: 0.2 })
                  observer.observe(el)
                }
              }}
              className="bg-yellow-900/20 backdrop-blur-sm border border-yellow-500/20 rounded-2xl p-8 md:p-10 max-w-4xl mx-auto transition-all duration-800 ease-out opacity-0"
              style={{ 
                transform: "translateY(50px) translateX(20px) rotate(2deg)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 40px rgba(234, 179, 8, 0.3)"
              }}
            >
              <p className="text-xl md:text-2xl text-yellow-100 leading-relaxed text-center">
                <em>In due time the Character that summoned him will be revealed, question is, would you be holding until then? 🤫</em>
              </p>
              </div>

            {/* Final Badge */}
            <div 
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        setTimeout(() => {
                          entry.target.style.transform = "translateY(0) scale(1)"
                          entry.target.style.opacity = "1"
                        }, 750)
                      }
                    })
                  }, { threshold: 0.2 })
                  observer.observe(el)
                }
              }}
              className="text-center mt-8 transition-all duration-600 ease-out opacity-0"
              style={{ 
                transform: "translateY(30px) scale(0.8)"
              }}
            >
              <Badge
                variant="secondary"
                className="bg-lime-500/20 text-lime-300 border-lime-400/50 text-xl py-3 px-6 backdrop-blur-sm"
                style={{ 
                  fontFamily: "'Orbitron', monospace",
                  textShadow: "0 0 20px rgba(132, 204, 22, 0.6)"
                }}
              >
                Fast & Powerful
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            ref={tokenomicsTitleRef}
            className="text-4xl md:text-5xl font-bold text-center text-green-400 mb-12 animate-slide-down opacity-0"
            style={{ transform: "translateY(-50px)" }}
          >
            Tokenomics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TokenomicsCard title="Total Supply" value="1B" description="Fixed supply, no inflation" />
            <TokenomicsCard title="Liquidity" value="Locked" description="Holders protected forever" />
            <TokenomicsCard title="Ticker" value="$RTR" description="Easy to remember & trade" />
            <TokenomicsCard title="Chain" value="Abstract" description="Fast & low fees" />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4">
        <div className="max-w-6xl mx-auto relative z-10">
          <h2
            ref={galleryTitleRef}
            className="text-4xl md:text-5xl font-bold text-center text-lime-400 mb-12 animate-slide-left opacity-0"
            style={{ transform: "translateX(100px)" }}
          >
            Rattler's Gallery
          </h2>

                  {/* Grid Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10">
          {galleryImages.slice(0, visibleImages).map((src, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-green-500/20 hover:border-green-400/50 transition-all duration-200 hover:scale-102 cursor-pointer"
              style={{
                aspectRatio: "1/1"
              }}
              onClick={() => setSelectedImage(src)}
            >
                            {/* Image with lazy loading */}
                    <img
                      src={src || "/placeholder.svg"}
                alt={`Rattler gallery image ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              
              {/* Simplified Hover Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              </div>

              {/* Reduced Glow Effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{
                boxShadow: "0 0 20px rgba(34, 197, 94, 0.3)"
              }}></div>
            </div>
          ))}
            </div>

        {/* Gallery Stats */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-lg">
            Exclusive Rattler Artwork
          </p>
        </div>

        {/* Load More Button */}
        {visibleImages < galleryImages.length && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMoreImages}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-2xl backdrop-blur-sm border border-green-400/30"
              style={{
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)",
                fontFamily: "'Orbitron', monospace"
              }}
            >
              Load More Artwork
            </Button>
          </div>
        )}
        </div>
      </section>

      {/* Memedepot Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            ref={memedepotTitleRef}
            className="text-4xl md:text-5xl font-bold text-green-400 mb-8 animate-slide-up opacity-0"
            style={{ transform: "translateY(50px)" }}
          >
            Memedepot
          </h2>
          <Card className="bg-transparent border-green-500/20 p-8">
            <CardContent>
              <p className="text-xl text-gray-300 mb-6">
                Discover the ultimate collection of Rattler memes, community creations, and exclusive content. The
                Memedepot is where creativity meets community!
              </p>
              <Button
                variant="outline"
                size="lg"
                className="bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30 hover:scale-105 transition-all duration-300"
                onClick={() => window.open('https://memedepot.com/d/rattler', '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Explore Memedepot
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How to Buy Section */}
      <section id="howtobuy" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
              <h2
                ref={adventureTitleRef}
              className="text-4xl md:text-5xl font-bold text-green-400 mb-6 animate-slide-down opacity-0"
              style={{ transform: "translateY(-50px)", fontFamily: "'Orbitron', monospace" }}
              >
              How to buy $RATTLER
              </h2>
            <p className="text-xl text-gray-300 mb-8">
              Ready to slide into the coolest adventure? Grab your token, join the Rattler squad, and waddle your way to frosty fun!
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="group bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 transition-all duration-300 hover:bg-green-900/30 hover:border-green-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "'Orbitron', monospace" }}>
                  1
                </div>
                <h3 className="text-2xl font-bold text-lime-400 mb-4 group-hover:text-lime-300 transition-colors duration-300" style={{ fontFamily: "'Orbitron', monospace" }}>
                  Set up your Wallet
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-green-100 transition-colors duration-300">
                  Create a wallet compatible with the Abstract network. You can use MetaMask or the Abstract Global Wallet.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 transition-all duration-300 hover:bg-green-900/30 hover:border-green-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-full flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "'Orbitron', monospace" }}>
                  2
                </div>
                <h3 className="text-2xl font-bold text-lime-400 mb-4 group-hover:text-lime-300 transition-colors duration-300" style={{ fontFamily: "'Orbitron', monospace" }}>
                  Add ETH to wallet
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-green-100 transition-colors duration-300">
                  Deposit ethereum from an exchange or bridge it from ethereum Mainnet to the Abstract network
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group bg-black/20 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 transition-all duration-300 hover:bg-green-900/30 hover:border-green-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 md:col-span-2 lg:col-span-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-lime-500 to-green-500 rounded-full flex items-center justify-center text-2xl font-bold text-black mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" style={{ fontFamily: "'Orbitron', monospace" }}>
                  3
                </div>
                <h3 className="text-2xl font-bold text-lime-400 mb-4 group-hover:text-lime-300 transition-colors duration-300" style={{ fontFamily: "'Orbitron', monospace" }}>
                  Swap for Token
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-green-100 transition-colors duration-300">
                  Swap your ETH for Rattler token, confirm the transaction, and become a proud holder of $RTR
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Lily's Adventure Footer */}
      <section id="community" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            ref={joinTitleRef}
            className="text-4xl md:text-5xl font-bold text-lime-400 mb-8 animate-slide-down opacity-0"
            style={{ transform: "translateY(-50px)" }}
          >
            Join Rattler's Adventure
          </h2>
          <p className="text-xl text-gray-300 mb-12">Connect with our amazing community across all platforms</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="bg-black/60 border-green-500/50 text-lime-400 hover:bg-green-500/20 hover:border-lime-400 hover:text-lime-300 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              asChild
            >
              <a href="https://x.com/RattlerOnAbs" target="_blank" rel="noopener noreferrer" aria-label="X">
                <X className="w-5 h-5" />
              </a>
            </Button>
            <SocialButton icon={ExternalLink} label="Dex" href="https://dexscreener.com/abstract/0xba0f1818bc028eda1c44792ac361c4cedd804c3b" />
            <SocialButton icon={Send} label="Telegram" href="https://t.me/rtrabs" />
            <SocialButton icon={ShoppingCart} label="Buy $RTR" href="https://portal.abs.xyz/trade?buy=0xc3882e7ce4d62bb571a6f417419c4e0ecb82d944&showChart=true&showHistory=true" />
          </div>
        </div>
      </section>

      {/* Repeated Tokenomics Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            ref={whyChooseTitleRef}
            className="text-4xl md:text-5xl font-bold text-center text-green-400 mb-12 animate-slide-right opacity-0"
            style={{ transform: "translateX(-100px)" }}
          >
            Why Choose $RTR?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TokenomicsCard title="Community First" value="100%" description="Built by and for the community" />
            <TokenomicsCard title="Fair Launch" value="✓" description="No presale, no team tokens" />
            <TokenomicsCard title="Renounced" value="✓" description="Contract ownership renounced" />
            <TokenomicsCard title="Verified" value="✓" description="Fully audited and verified" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2
            ref={finalCtaRef}
            className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-up opacity-0"
            style={{ transform: "translateY(50px)" }}
          >
            Ready to Join the Adventure?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-black font-bold py-4 px-8 rounded-full text-xl hover:scale-105 transition-all duration-300 shadow-2xl"
              style={{
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)",
                fontFamily: "'Orbitron', monospace"
              }}
              onClick={() => window.open('https://portal.abs.xyz/trade?buy=0xc3882e7ce4d62bb571a6f417419c4e0ecb82d944&showChart=true&showHistory=true', '_blank')}
            >
              Buy $RTR Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-green-500 text-green-400 hover:bg-green-500/20 font-bold py-4 px-8 rounded-full text-xl hover:scale-105 transition-all duration-300 bg-transparent"
              style={{ fontFamily: "'Orbitron', monospace" }}
              onClick={() => window.open('https://dexscreener.com/abstract/0xba0f1818bc028eda1c44792ac361c4cedd804c3b', '_blank')}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-full">
            {/* Close Button */}
            <button
              className="absolute -top-4 -right-4 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-2xl"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage(null)
              }}
              aria-label="Close image"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Image */}
            <img
              src={selectedImage}
              alt="Rattler artwork full view"
              className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl will-change-transform"
              style={{
                boxShadow: "0 0 50px rgba(34, 197, 94, 0.3)"
              }}
              onClick={(e) => e.stopPropagation()}
              loading="eager"
            />

            {/* Modal Glow Effect */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: "0 0 80px rgba(34, 197, 94, 0.4), 0 0 160px rgba(132, 204, 22, 0.3)"
              }}
            ></div>
          </div>

          {/* Click to close instruction */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <p className="text-green-400 text-lg font-semibold backdrop-blur-sm bg-black/50 px-6 py-3 rounded-full border border-green-500/30" style={{ fontFamily: "'Orbitron', monospace" }}>
              Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
