"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Brain,
  Globe,
  Terminal,
  ChevronDown,
  Zap,
  Star,
  Sparkles,
} from "lucide-react"
import { useScrollAnimations } from "./hooks/useScrollAnimations"
import { useTiltEffect, useMagneticEffect } from "./hooks/useTiltEffect"

export default function Portfolio() {
  const [bookOpened, setBookOpened] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mouseOnCover, setMouseOnCover] = useState({ x: 0, y: 0 })

  const tilt = useTiltEffect(8)
  const magnetic = useMagneticEffect(0.15)
  useScrollAnimations(bookOpened)

  const handleBookClick = () => {
    if (animating) return
    setAnimating(true)
    // At the end of the camera dive, instantly swap: remove overlay, show hero.
    // No fade on the overlay — the interior text IS the hero text at 4x, so instant swap = seamless.
    setTimeout(() => {
      setBookOpened(true)
    }, 2400)
  }

  const handleCoverMouseMove = useCallback((e: React.MouseEvent) => {
    if (animating) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMouseOnCover({ x, y })
  }, [animating])

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalScroll) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const projects = [
    {
      title: "Emojify",
      description:
        "Deep learning model that analyzes sentence sentiment and assigns contextually appropriate emojis using natural language processing.",
      tech: ["Python", "TensorFlow", "NLP", "Jupyter"],
      link: "https://github.com/gabemeredith/Emojify",
      color: "from-blue-400 to-cyan-400",
    },
    {
      title: "U-NET Image Segmentation",
      description:
        "Computer vision algorithm for autonomous vehicle navigation using U-NET architecture for real-time semantic segmentation.",
      tech: ["Python", "PyTorch", "Computer Vision", "Deep Learning"],
      link: "https://github.com/gabemeredith/U-NETimgSegmentation",
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Local Lens",
      description:
        "Collaborative hackathon project built during Cornell's Big Red Hacks 2025, showcasing rapid prototyping and teamwork.",
      tech: ["JavaScript", "React", "Node.js", "API Integration"],
      link: "https://hackshackll.vercel.app/",
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "Automated TikTok",
      description:
        "Automation tool for TikTok content management and interaction, streamlining social media workflows with intelligent scripting.",
      tech: ["Python", "Automation", "Web Scraping"],
      link: "https://github.com/gabemeredith/Automated-Tiktok",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      skills: ["Python", "JavaScript", "TypeScript", "SQL"],
      color: "text-cyan-400",
    },
    {
      title: "AI/ML",
      icon: Brain,
      skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Deep Learning"],
      color: "text-blue-400",
    },
    {
      title: "Web Dev",
      icon: Globe,
      skills: ["React", "Next.js", "Node.js", "Tailwind CSS", "REST APIs"],
      color: "text-emerald-400",
    },
    {
      title: "Tools",
      icon: Terminal,
      skills: ["Git", "Jupyter", "VS Code"],
      color: "text-indigo-400",
    },
  ]

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Comic+Neue:wght@400;700&display=swap');

        .font-comic {
          font-family: 'Comic Neue', cursive;
        }
        .font-bangers {
          font-family: 'Bangers', cursive;
        }

        .text-stroke-3 {
          -webkit-text-stroke: 3px black;
          paint-order: stroke fill;
        }
        .text-stroke-2 {
          -webkit-text-stroke: 2px black;
          paint-order: stroke fill;
        }

        /* === COVER ANIMATIONS === */
        @keyframes cover-pulse {
          0% { transform: perspective(800px) rotateY(var(--ry, 0deg)) rotateX(var(--rx, 0deg)) scale(1); }
          100% { transform: perspective(800px) rotateY(0deg) rotateX(0deg) scale(1.02); }
        }

        @keyframes cover-open {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-160deg); }
        }

        /* 4x zoom: interior text × 4 = hero text size */
        @keyframes camera-dive {
          0% { transform: scale(1); }
          100% { transform: scale(4); }
        }

        .cover-pulse-animate {
          animation: cover-pulse 0.3s ease-out forwards;
        }

        .cover-open-animate {
          animation: cover-open 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards;
          transform-origin: left center;
        }

        .camera-dive-animate {
          animation: camera-dive 1.0s cubic-bezier(0.32, 0, 0.67, 0) 1.4s forwards;
        }

        /* === COVER DECORATIVE ANIMATIONS === */
        @keyframes speed-line-pulse {
          0%, 100% { opacity: 0.06; }
          50% { opacity: 0.15; }
        }

        @keyframes float-up {
          0%, 100% { transform: translateY(0px) rotate(var(--float-rot, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--float-rot, 0deg)); }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @keyframes badge-bounce {
          0%, 100% { transform: rotate(-6deg) scale(1); }
          50% { transform: rotate(-6deg) scale(1.05); }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1) rotate(180deg); }
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 12px 12px 0px 0px rgba(0,0,0,1), 0 0 20px rgba(255,255,0,0); }
          50% { box-shadow: 12px 12px 0px 0px rgba(0,0,0,1), 0 0 40px rgba(255,255,0,0.3); }
        }

        .speed-line-animated {
          animation: speed-line-pulse 3s ease-in-out infinite;
        }

        .float-animated {
          animation: float-up 3s ease-in-out infinite;
        }

        .shimmer-text {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s ease-in-out infinite;
        }

        .badge-animated {
          animation: badge-bounce 2s ease-in-out infinite;
        }

        .glow-animated {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        /* === NAV === */
        @keyframes nav-drop {
          0% { transform: translateY(-120%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .nav-drop-in {
          animation: nav-drop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .nav-hidden {
          transform: translateY(-120%);
          opacity: 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #dc2626;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }

        /* === ACTION WORDS === */
        @keyframes action-pop {
          0%, 100% { transform: scale(1) rotate(var(--action-rot, -12deg)); }
          50% { transform: scale(1.1) rotate(var(--action-rot, -12deg)); }
        }
        .action-word {
          animation: action-pop 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Book Cover Overlay — removed instantly (no fade) when bookOpened flips */}
      {!bookOpened && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-yellow-200 overflow-hidden"
        >
          {/* Halftone dot pattern background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          />

          {/* Animated speed lines radiating from center */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(24)].map((_, i) => (
              <div
                key={i}
                className="speed-line-animated absolute top-1/2 left-1/2 bg-black"
                style={{
                  width: i % 3 === 0 ? "3px" : "1.5px",
                  height: "150%",
                  transform: `rotate(${i * 15}deg)`,
                  transformOrigin: "top center",
                  animationDelay: `${i * 0.12}s`,
                }}
              />
            ))}
          </div>

          {/* Floating comic sparkles around the book */}
          {!animating && (
            <div className="absolute inset-0 pointer-events-none">
              {[
                { top: "12%", left: "15%", delay: "0s", size: "w-5 h-5" },
                { top: "20%", right: "18%", delay: "0.8s", size: "w-4 h-4" },
                { top: "75%", left: "20%", delay: "1.6s", size: "w-3 h-3" },
                { top: "70%", right: "15%", delay: "0.4s", size: "w-5 h-5" },
                { top: "30%", left: "8%", delay: "1.2s", size: "w-4 h-4" },
                { top: "60%", right: "8%", delay: "2.0s", size: "w-3 h-3" },
              ].map((spark, i) => (
                <div
                  key={i}
                  className={`absolute ${spark.size} text-yellow-500`}
                  style={{
                    top: spark.top,
                    left: spark.left,
                    right: spark.right,
                    animation: `sparkle 2.5s ease-in-out ${spark.delay} infinite`,
                  }}
                >
                  <Sparkles className="w-full h-full" />
                </div>
              ))}
            </div>
          )}

          {/* Floating action words */}
          {!animating && (
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              <div
                className="action-word absolute top-[15%] left-[6%] bg-yellow-300 border-3 border-black px-3 py-1 font-bangers text-lg tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                style={{ "--action-rot": "-12deg", animationDelay: "0s" } as React.CSSProperties}
              >
                POW!
              </div>
              <div
                className="action-word absolute top-[18%] right-[7%] bg-red-500 text-white border-3 border-black px-3 py-1 font-bangers text-lg tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                style={{ "--action-rot": "8deg", animationDelay: "0.8s" } as React.CSSProperties}
              >
                ZAP!
              </div>
              <div
                className="action-word absolute bottom-[18%] left-[8%] bg-blue-500 text-white border-3 border-black px-3 py-1 font-bangers text-lg tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                style={{ "--action-rot": "15deg", animationDelay: "1.5s" } as React.CSSProperties}
              >
                WHAM!
              </div>
              <div
                className="action-word absolute bottom-[22%] right-[6%] bg-emerald-500 text-white border-3 border-black px-3 py-1 font-bangers text-lg tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                style={{ "--action-rot": "-8deg", animationDelay: "0.4s" } as React.CSSProperties}
              >
                BAM!
              </div>
            </div>
          )}

          {/* Camera dive wrapper — scales the entire book scene 4x */}
          <div
            className={animating ? "camera-dive-animate" : ""}
            style={{ transformOrigin: "center center" }}
          >
            {/* Book Container with 3D tilt on hover */}
            <div
              className={`relative w-[85vw] max-w-xl aspect-[3/4] cursor-pointer ${animating ? "cover-pulse-animate" : ""}`}
              onClick={handleBookClick}
              onMouseMove={handleCoverMouseMove}
              onMouseLeave={() => !animating && setMouseOnCover({ x: 0, y: 0 })}
              style={{
                transformStyle: "preserve-3d",
                transform: animating
                  ? undefined
                  : `perspective(800px) rotateY(${mouseOnCover.x * 5}deg) rotateX(${-mouseOnCover.y * 5}deg)`,
                transition: animating ? undefined : "transform 0.15s ease-out",
                ["--ry" as string]: `${mouseOnCover.x * 5}deg`,
                ["--rx" as string]: `${-mouseOnCover.y * 5}deg`,
              }}
            >
              {/* Comic-style shadow */}
              <div className="absolute inset-0 bg-black transform translate-x-4 translate-y-4 -z-10" />

              {/* Interior Page — all elements at 1/4 hero size, 4x zoom = exact match */}
              <div className="absolute inset-0 border-8 border-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-red-200 to-blue-200" />
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 h-full bg-black opacity-5"
                      style={{
                        transform: `rotate(${i * 22.5}deg)`,
                        transformOrigin: "top center",
                      }}
                    />
                  ))}
                </div>

                {/* Floating action words at 1/4 scale */}
                <div className="absolute top-[10%] left-[3%] hidden md:block">
                  <div className="bg-yellow-300 border border-black px-1 py-0.5 font-bangers text-[0.3rem] tracking-wide shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transform -rotate-12">
                    WOW!
                  </div>
                </div>
                <div className="absolute top-[14%] right-[3%] hidden md:block">
                  <div className="bg-red-500 text-white border border-black px-1 py-0.5 font-bangers text-[0.3rem] tracking-wide shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transform rotate-6">
                    AMAZING!
                  </div>
                </div>

                <div className="relative h-full flex flex-col items-center justify-center">
                  {/* Issue #1 badge: hero is text-sm/text-base → 1/4 ≈ text-[0.22rem]/text-[0.25rem] */}
                  <div className="mb-1 md:mb-1.5">
                    <div className="inline-block bg-yellow-300 border border-black px-2 py-0.5 transform -rotate-2 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                      <p className="text-[0.22rem] md:text-[0.25rem] font-black uppercase tracking-widest flex items-center gap-0.5">
                        <Zap className="w-1 h-1" />
                        Issue #1
                        <Zap className="w-1 h-1" />
                      </p>
                    </div>
                  </div>

                  {/* Name: hero is 6rem/10rem/12rem → 1/4 = 1.5rem/2.5rem/3rem */}
                  <h1 className="text-[1.5rem] md:text-[2.5rem] lg:text-[3rem] font-black mb-1 md:mb-1.5 italic transform -skew-y-2 text-center leading-[0.85]">
                    <span className="inline-block text-stroke-2 text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      GABE
                    </span>
                    <br />
                    <span className="inline-block text-stroke-2 text-red-600 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                      MEREDITH
                    </span>
                  </h1>

                  {/* Subtitle: hero is text-xl/2xl/3xl → 1/4 ≈ text-[0.31rem]/text-[0.375rem]/text-[0.47rem] */}
                  <div className="inline-block bg-white border border-black px-2 py-0.5 transform rotate-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-1 md:mb-2">
                    <p className="text-[0.31rem] md:text-[0.375rem] lg:text-[0.47rem] font-bold uppercase tracking-wide flex items-center gap-0.5">
                      <Star className="w-1 h-1 md:w-1.5 md:h-1.5 text-yellow-500" />
                      Origin Story: CS @ Cornell
                      <Star className="w-1 h-1 md:w-1.5 md:h-1.5 text-yellow-500" />
                    </p>
                  </div>

                  {/* Speech bubble: hero is text-xl/2xl → 1/4 ≈ text-[0.31rem]/text-[0.375rem] */}
                  <div className="max-w-[60%] mt-1">
                    <div className="bg-white border border-black rounded-lg px-1.5 py-1 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-comic text-[0.31rem] md:text-[0.375rem] font-bold text-center">
                        &ldquo;Every great developer has an origin story...&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Front Cover */}
              <div
                className={`absolute inset-0 w-full h-full bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 border-8 border-black ${animating ? "cover-open-animate" : "glow-animated"}`}
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                  transformOrigin: "left center",
                }}
              >
                {/* Comic book dots texture */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle, black 2px, transparent 2px)`,
                    backgroundSize: "15px 15px",
                  }}
                />

                {/* Inner border */}
                <div className="absolute inset-3 md:inset-4 border-4 border-black" />

                {/* Diagonal speed lines across cover */}
                <div className="absolute inset-0 overflow-hidden opacity-[0.07]">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-[200%] w-[2px] bg-black"
                      style={{
                        left: `${i * 9}%`,
                        top: "-50%",
                        transform: "rotate(25deg)",
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center p-5 md:p-8">
                  {/* Top explosion badge */}
                  <div className="relative mb-3 md:mb-4">
                    <div className="badge-animated bg-yellow-300 border-4 border-black px-5 md:px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="text-xs md:text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3 md:w-4 md:h-4" />
                        Portfolio
                        <Zap className="w-3 h-3 md:w-4 md:h-4" />
                      </p>
                    </div>
                    {/* Larger starburst */}
                    <div className="absolute inset-0 -z-10">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute top-1/2 left-1/2 w-16 h-1 bg-yellow-400"
                          style={{
                            transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Main Title with shimmer */}
                  <div className="text-center mb-3 md:mb-4">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-1 md:mb-2">
                      <span className="inline-block text-stroke-3 text-white drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                        GABRIEL
                      </span>
                    </h1>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none">
                      <span className="inline-block text-stroke-3 text-yellow-300 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                        MEREDITH
                      </span>
                    </h1>
                  </div>

                  {/* Subtitle */}
                  <div className="relative mb-3 md:mb-4">
                    <div className="bg-white border-4 border-black px-5 md:px-6 py-2 transform rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                      <p className="text-sm md:text-xl font-black uppercase tracking-wide flex items-center gap-2">
                        <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                        Computer Science @ Cornell
                        <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                      </p>
                    </div>
                  </div>

                  {/* Issue badge */}
                  <div className="relative mb-3 md:mb-4">
                    <div className="bg-blue-500 border-4 border-black px-5 md:px-6 py-2 transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-black text-white text-xs md:text-lg uppercase italic">
                        Developer &bull; Problem Solver
                      </p>
                    </div>
                  </div>

                  {/* Author credit */}
                  <div className="bg-red-500 border-4 border-black px-4 md:px-5 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                    <p className="font-black text-white text-xs md:text-sm uppercase tracking-wider">
                      Issue #001 &bull; 2025
                    </p>
                  </div>

                  {/* Click instruction — more prominent */}
                  {!animating && (
                    <div className="absolute bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                      <div className="bg-yellow-300 border-4 border-black px-5 py-2 md:px-6 md:py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="font-black uppercase text-xs md:text-sm flex items-center gap-2">
                          <span className="inline-block animate-pulse">&#9758;</span>
                          <span>Click to Read</span>
                          <span className="text-lg">&rarr;</span>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Corner badges */}
                  <div className="absolute top-2 left-2 bg-red-500 border-2 border-black w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center transform -rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-black text-white text-lg md:text-2xl">#1</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-yellow-300 border-2 border-black px-2 py-1 md:px-3 md:py-1 transform rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-black text-xs md:text-sm uppercase">New!</span>
                  </div>
                  {/* Bottom corner accents */}
                  <div className="absolute bottom-2 left-2 hidden md:flex items-center gap-1">
                    <div className="w-3 h-3 bg-white border-2 border-black rounded-full" />
                    <div className="w-2 h-2 bg-white border-2 border-black rounded-full" />
                    <div className="w-1.5 h-1.5 bg-white border-2 border-black rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-amber-50 relative">
        {/* Comic Book Paper Texture Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Scroll Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-2 bg-slate-200 z-50">
          <div
            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Navigation */}
        <nav className="fixed top-2 left-0 right-0 z-40 px-4">
          <div className={`max-w-7xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${bookOpened ? "nav-drop-in" : "nav-hidden"}`}>
            <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <div className="text-3xl font-black italic transform -skew-x-6">
                <span className="text-red-600">GM</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 items-center font-bold">
                {["Story", "Projects", "Skills", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="nav-link text-black hover:text-red-600 transition-colors uppercase tracking-wider text-sm relative"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Cover Page / Hero — fills viewport edge-to-edge */}
        <section className="min-h-screen flex items-center justify-center px-0 pt-20 pb-0 relative overflow-hidden">
          {/* Full-bleed gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-red-200 to-blue-200" />

          {/* Animated speed lines behind hero */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 bg-black opacity-[0.04]"
                style={{
                  width: i % 3 === 0 ? "2px" : "1px",
                  height: "150%",
                  transform: `rotate(${i * 18}deg)`,
                  transformOrigin: "top center",
                }}
              />
            ))}
          </div>

          {/* Parallax decorative elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="parallax-slow absolute top-[10%] left-[5%] w-20 h-20 border-4 border-red-400/30 rounded-full" />
            <div className="parallax-fast absolute top-[25%] right-[8%] w-10 h-10 bg-blue-400/20 rotate-45" />
            <div className="parallax-slow absolute bottom-[20%] right-[12%] w-16 h-16 border-4 border-yellow-500/30" />
            <div className="parallax-fast absolute bottom-[30%] left-[10%] w-8 h-8 bg-red-400/15 rounded-full" />
          </div>

          {/* Large pulsing circle */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
            <div className="w-[900px] h-[900px] rounded-full border-[80px] border-black animate-pulse" />
          </div>

          {/* Comic-style decorative corners */}
          {bookOpened && (
            <>
              <div className="absolute top-24 left-4 md:left-8 hidden md:block">
                <div className="float-animated bg-yellow-300 border-3 border-black px-3 py-1 font-bangers text-base tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform -rotate-12" style={{ "--float-rot": "-12deg" } as React.CSSProperties}>
                  WOW!
                </div>
              </div>
              <div className="absolute top-32 right-4 md:right-8 hidden md:block">
                <div className="float-animated bg-red-500 text-white border-3 border-black px-3 py-1 font-bangers text-base tracking-wide shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transform rotate-6" style={{ "--float-rot": "6deg", animationDelay: "1s" } as React.CSSProperties}>
                  AMAZING!
                </div>
              </div>
            </>
          )}

          <div className={`relative z-10 text-center max-w-5xl w-full px-6 ${!bookOpened ? "invisible" : ""}`}>
            <div className="hero-badge mb-6 md:mb-8">
              <div className="inline-block bg-yellow-300 border-4 border-black px-8 md:px-10 py-2 md:py-3 transform -rotate-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-sm md:text-base font-black uppercase tracking-widest flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Issue #1
                  <Zap className="w-4 h-4" />
                </p>
              </div>
            </div>

            <h1 className="text-8xl md:text-[10rem] lg:text-[12rem] font-black mb-4 md:mb-6 italic transform -skew-y-2 leading-[0.85]">
              <span className="hero-name inline-block text-stroke-3 text-white drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                GABE
              </span>
              <br />
              <span className="hero-name inline-block text-stroke-3 text-red-600 drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">
                MEREDITH
              </span>
            </h1>

            <div className="hero-subtitle inline-block bg-white border-4 border-black px-8 md:px-10 py-3 md:py-4 transform rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6 md:mb-8">
              <p className="text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wide flex items-center gap-3">
                <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
                Origin Story: CS @ Cornell
                <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
              </p>
            </div>

            <div className="hero-bubble relative inline-block mt-6 md:mt-8 max-w-lg mb-16 md:mb-20">
              <div className="bg-white border-4 border-black rounded-3xl px-8 md:px-10 py-6 md:py-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-comic text-xl md:text-2xl font-bold">
                  &ldquo;Every great developer has an origin story...&rdquo;
                </p>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-t-[30px] border-t-black border-r-[20px] border-r-transparent" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-[-26px] w-0 h-0 border-l-[16px] border-l-transparent border-t-[26px] border-t-white border-r-[16px] border-r-transparent" />
              </div>
            </div>

            <div className="hero-chevron mt-8 md:mt-12 flex justify-center animate-bounce">
              <div className="bg-yellow-300 border-4 border-black rounded-full p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ChevronDown className="w-8 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Panel 1 - The Beginning */}
        <section id="story" className="min-h-screen px-6 py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="parallax-fast absolute top-[10%] right-[5%] w-6 h-6 bg-red-400 rounded-full opacity-15" />
            <div className="parallax-slow absolute bottom-[20%] left-[5%] w-10 h-10 border-4 border-blue-400 rotate-12 opacity-15" />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2">
              <div className="chapter-header bg-red-600 border-4 border-black px-4 py-2 -mt-6 -mx-6 mb-4 flex items-center overflow-hidden">
                <div className="line-left flex-1 h-1 bg-white/40 mr-4" />
                <h2 className="chapter-title text-white text-3xl font-black uppercase tracking-wider text-center whitespace-nowrap">
                  Chapter One: The Early Days
                </h2>
                <div className="line-right flex-1 h-1 bg-white/40 ml-4" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="project-card border-4 border-black bg-gradient-to-br from-blue-100 to-cyan-100 p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-4 left-4 bg-yellow-300 border-2 border-black px-3 py-1 transform -rotate-6">
                    <p className="text-xs font-black uppercase">Panel 1</p>
                  </div>
                  <img
                    src="/professional-headshot.png"
                    alt="Gabriel Meredith"
                    className="w-64 h-64 rounded-full object-cover border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div className="project-card border-4 border-black bg-white p-6 space-y-4 relative">
                  <div className="bg-yellow-100 border-3 border-black p-4 italic">
                    <p className="font-comic text-sm leading-relaxed">
                      <strong className="block text-xs uppercase mb-1">Somewhere in New York...</strong>
                      Growing up, I was always fascinated by how things worked. Not just physically, but logically.
                      How do computers think? How do algorithms solve problems? How can we teach machines to learn?
                    </p>
                  </div>

                  <div className="relative mt-6">
                    <div className="speech-bubble bg-white border-3 border-black rounded-2xl px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-comic font-bold">
                        &ldquo;I&rsquo;m a Computer Science student at Cornell University and a data engineer with the Cornell Algorithmic Trading Club, focused on software engineering at the intersection of systems, data, and applied AI. I build scalable, performance-driven tools for real-world decision-making and research.&rdquo;
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <a
                      href="https://github.com/gabemeredith"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-black text-white border-3 border-black px-3 py-2 text-center font-bold uppercase text-sm hover:bg-red-600 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <Github className="inline w-4 h-4 mr-1" />
                      GitHub
                    </a>
                    <a
                      href="https://linkedin.com/in/gabriel-meredith"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 text-white border-3 border-black px-3 py-2 text-center font-bold uppercase text-sm hover:bg-blue-700 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <Linkedin className="inline w-4 h-4 mr-1" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Panel 2 - The Projects */}
        <section id="projects" className="min-h-screen px-6 py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="parallax-slow absolute top-[5%] left-[8%] w-14 h-14 border-4 border-yellow-500 rounded-full opacity-15" />
            <div className="parallax-fast absolute bottom-[15%] right-[8%] w-8 h-8 bg-indigo-400 rotate-45 opacity-15" />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2">
              <div className="chapter-header bg-blue-600 border-4 border-black px-4 py-2 -mt-6 -mx-6 mb-4 flex items-center overflow-hidden">
                <div className="line-left flex-1 h-1 bg-white/40 mr-4" />
                <h2 className="chapter-title text-white text-3xl font-black uppercase tracking-wider text-center whitespace-nowrap">
                  Chapter Two: The Adventures
                </h2>
                <div className="line-right flex-1 h-1 bg-white/40 ml-4" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                {projects.map((project, i) => (
                  <div
                    key={project.title}
                    className="project-card border-4 border-black bg-white p-6 relative transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2"
                    onMouseMove={tilt.onMouseMove}
                    onMouseLeave={tilt.onMouseLeave}
                  >
                    <div className="absolute -top-6 -left-6 bg-yellow-300 border-3 border-black w-12 h-12 rounded-full flex items-center justify-center font-black text-xl transform -rotate-12 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      {i + 1}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-black uppercase leading-tight pr-2">
                          {project.title}
                        </h3>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black text-white border-2 border-black p-2 hover:bg-red-600 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>

                      <p className="font-comic text-sm leading-relaxed border-l-4 border-black pl-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="bg-white border-2 border-black px-3 py-1 text-xs font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Panel 3 - The Skills */}
        <section id="skills" className="min-h-screen px-6 py-20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="parallax-fast absolute top-[8%] left-[12%] w-10 h-10 border-4 border-emerald-400 rounded-full opacity-15" />
            <div className="parallax-slow absolute bottom-[10%] right-[6%] w-6 h-6 bg-cyan-400 rotate-12 opacity-15" />
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2">
              <div className="chapter-header bg-emerald-600 border-4 border-black px-4 py-2 -mt-6 -mx-6 mb-4 flex items-center overflow-hidden">
                <div className="line-left flex-1 h-1 bg-white/40 mr-4" />
                <h2 className="chapter-title text-white text-3xl font-black uppercase tracking-wider text-center whitespace-nowrap">
                  Chapter Three: The Arsenal
                </h2>
                <div className="line-right flex-1 h-1 bg-white/40 ml-4" />
              </div>

              <div className="p-6 pb-0">
                <div className="relative max-w-2xl mx-auto mb-8">
                  <div className="speech-bubble bg-white border-4 border-black rounded-full px-8 py-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-comic font-bold text-center italic">
                      &ldquo;Every hero needs their tools and powers...&rdquo;
                    </p>
                  </div>
                  <div className="absolute -bottom-6 left-1/4">
                    <div className="speech-dot w-6 h-6 bg-white border-3 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                  </div>
                  <div className="absolute -bottom-10 left-1/4 -ml-4">
                    <div className="speech-dot w-4 h-4 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                  </div>
                </div>
              </div>

              <div className="skill-grid grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {skillCategories.map((category) => (
                  <div
                    key={category.title}
                    className="skill-card border-4 border-black bg-white p-6 space-y-4 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-center gap-3 border-b-4 border-black pb-3">
                      <div className={`${category.color} bg-black p-2 border-2 border-black`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black uppercase">{category.title}</h3>
                    </div>

                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill}
                          className="skill-item bg-yellow-100 border-2 border-black px-3 py-2 text-sm font-bold transform hover:translate-x-1 transition-transform"
                        >
                          &bull; {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final Panel - Contact */}
        <section
          id="contact"
          className="contact-section min-h-screen px-6 py-20 flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="parallax-slow absolute top-[12%] right-[10%] w-12 h-12 border-4 border-red-400 rotate-45 opacity-15" />
            <div className="parallax-fast absolute bottom-[20%] left-[8%] w-8 h-8 bg-blue-400 rounded-full opacity-15" />
          </div>

          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2">
              <div className="chapter-header bg-gradient-to-r from-red-600 to-blue-600 border-4 border-black px-4 py-2 -mt-6 -mx-6 mb-4 flex items-center overflow-hidden">
                <div className="line-left flex-1 h-1 bg-white/40 mr-4" />
                <h2 className="chapter-title text-white text-3xl font-black uppercase tracking-wider text-center whitespace-nowrap">
                  To Be Continued...
                </h2>
                <div className="line-right flex-1 h-1 bg-white/40 ml-4" />
              </div>

              <div className="p-8 text-center space-y-6">
                <div className="relative inline-block max-w-2xl">
                  <div className="speech-bubble bg-cyan-100 border-4 border-black rounded-3xl px-10 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-comic text-2xl font-bold mb-4">
                      &ldquo;Want to join the next chapter of this story?&rdquo;
                    </p>
                    <p className="font-comic text-lg">
                      I&rsquo;m always looking for new adventures, whether it&rsquo;s projects, opportunities, or just a good tech conversation!
                    </p>
                  </div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="speech-dot w-0 h-0 border-l-[25px] border-l-transparent border-t-[40px] border-t-black border-r-[25px] border-r-transparent" />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-[-36px] w-0 h-0 border-l-[21px] border-l-transparent border-t-[36px] border-t-cyan-100 border-r-[21px] border-r-transparent" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12">
                  <a
                    href="mailto:gabriel.b.meredith@gmail.com"
                    className="contact-cta bg-red-600 text-white border-4 border-black px-8 py-4 text-xl font-black uppercase hover:bg-red-700 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] inline-flex items-center justify-center gap-2"
                    onMouseMove={magnetic.onMouseMove}
                    onMouseLeave={magnetic.onMouseLeave}
                  >
                    <Mail className="w-6 h-6" />
                    Email Me
                  </a>
                  <a
                    href="https://github.com/gabemeredith"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-cta bg-black text-white border-4 border-black px-8 py-4 text-xl font-black uppercase hover:bg-gray-800 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] inline-flex items-center justify-center gap-2"
                    onMouseMove={magnetic.onMouseMove}
                    onMouseLeave={magnetic.onMouseLeave}
                  >
                    <Github className="w-6 h-6" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/gabriel-meredith"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-cta bg-blue-600 text-white border-4 border-black px-8 py-4 text-xl font-black uppercase hover:bg-blue-700 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] inline-flex items-center justify-center gap-2"
                    onMouseMove={magnetic.onMouseMove}
                    onMouseLeave={magnetic.onMouseLeave}
                  >
                    <Linkedin className="w-6 h-6" />
                    LinkedIn
                  </a>
                </div>

                <div className="pt-8">
                  <div className="end-badge inline-block bg-black text-white border-4 border-black px-6 py-3 transform rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-black uppercase tracking-widest">End of Issue #1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-8 border-black bg-black text-white py-8 px-6 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-comic text-lg">
              &copy; 2025 Gabriel Meredith. Made with &#10084;&#65039; and lots of &#9749;
            </p>
            <p className="font-comic text-sm mt-2 opacity-70">
              Built with Next.js and Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
