"use client"

import type React from "react"
import { useEffect, useState } from "react"
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
} from "lucide-react"

export default function Portfolio() {
  const [bookOpened, setBookOpened] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visiblePanels, setVisiblePanels] = useState<number[]>([])

  const handleBookClick = () => {
    setAnimating(true)
    setTimeout(() => {
      setBookOpened(true)
    }, 3500)
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalScroll) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px",
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const panelIndex = parseInt(entry.target.getAttribute("data-panel") || "0")
          setVisiblePanels((prev) => [...new Set([...prev, panelIndex])])
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const panels = document.querySelectorAll("[data-panel]")
    panels.forEach((panel) => observer.observe(panel))

    return () => panels.forEach((panel) => observer.unobserve(panel))
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
        
        .text-stroke-3 {
          -webkit-text-stroke: 3px black;
          paint-order: stroke fill;
        }

        @keyframes push-in {
          0% {
            transform: scale(1) translateZ(0);
          }
          100% {
            transform: scale(1.05) translateZ(100px);
          }
        }

        @keyframes cover-open {
          0% {
            transform: perspective(2000px) rotateY(0deg);
          }
          100% {
            transform: perspective(2000px) rotateY(-160deg);
          }
        }

        @keyframes interior-reveal {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes zoom-to-panel {
          0% {
            transform: scale(1) translate(0, 0);
          }
          100% {
            transform: scale(2.5) translate(20%, 25%);
          }
        }

        @keyframes fade-out {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        .push-in-animate {
          animation: push-in 1s ease-in forwards;
        }

        .cover-open-animate {
          animation: cover-open 1s ease-in-out 1s forwards;
          transform-origin: left center;
        }

        .interior-reveal-animate {
          animation: interior-reveal 0.8s ease-out 1s forwards;
        }

        .zoom-to-panel-animate {
          animation: zoom-to-panel 1.2s ease-in-out 2s forwards;
        }

        .fade-out-animate {
          animation: fade-out 0.5s ease-out 3s forwards;
        }
      `}</style>

      {/* Book Cover Overlay */}
      {!bookOpened && (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-yellow-200 ${animating ? 'fade-out-animate' : ''}`} style={{ perspective: '2000px' }}>
          {/* Halftone dot pattern background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Comic burst lines radiating from center */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-full bg-black opacity-10"
                style={{
                  transform: `rotate(${i * 22.5}deg)`,
                  transformOrigin: 'top center'
                }}
              />
            ))}
          </div>

          {/* Book Container with push-in animation */}
          <div className={`relative w-[80vw] max-w-xl aspect-[3/4] cursor-pointer ${animating ? 'push-in-animate' : ''}`} onClick={handleBookClick} style={{ transformStyle: 'preserve-3d' }}>
            {/* Comic-style shadow */}
            <div className="absolute inset-0 bg-black transform translate-x-4 translate-y-4 -z-10" />
            
            {/* Interior Page (revealed when cover opens) */}
            <div className={`absolute inset-0 bg-amber-50 border-8 border-black ${animating ? 'interior-reveal-animate zoom-to-panel-animate' : 'opacity-0'}`}>
              {/* Paper texture */}
              <div 
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`
                }}
              />
              
              {/* First Panel - Top Left (this will zoom in to fill screen) */}
              <div className="absolute top-4 left-4 right-1/2 h-[45%] border-4 border-black bg-gradient-to-br from-yellow-100 to-orange-100 overflow-hidden">
                <div className="absolute top-2 left-2 bg-yellow-300 border-2 border-black px-2 py-1 transform -rotate-3 text-xs font-black">
                  PANEL 1
                </div>
                <div className="h-full flex items-center justify-center p-6">
                  <div className="text-center">
                    <h2 className="text-4xl font-black uppercase mb-4">CHAPTER ONE</h2>
                    <p className="font-comic text-lg font-bold">The Early Days</p>
                  </div>
                </div>
              </div>

              {/* Other panels for completeness */}
              <div className="absolute top-4 right-4 left-1/2 h-[45%] border-4 border-black bg-white">
                <div className="h-full flex items-center justify-center p-4">
                  <p className="font-comic text-sm">Panel 2</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-1/2 h-[45%] border-4 border-black bg-white">
                <div className="h-full flex items-center justify-center p-4">
                  <p className="font-comic text-sm">Panel 3</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 left-1/2 h-[45%] border-4 border-black bg-white">
                <div className="h-full flex items-center justify-center p-4">
                  <p className="font-comic text-sm">Panel 4</p>
                </div>
              </div>
            </div>

            {/* Book Front Cover (flips open) */}
            <div className={`absolute inset-0 w-full h-full bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] ${animating ? 'cover-open-animate' : ''}`} style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}>
              {/* Comic book dots texture */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle, black 2px, transparent 2px)`,
                  backgroundSize: '15px 15px'
                }}
              />

              {/* Inner border - comic style */}
              <div className="absolute inset-4 border-4 border-black" />

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-6 md:p-8">
                {/* Top explosion badge */}
                <div className="relative mb-4">
                  <div className="bg-yellow-300 border-4 border-black px-6 py-2 transform -rotate-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs md:text-sm font-black uppercase tracking-widest">Portfolio</p>
                  </div>
                  {/* Starburst behind badge */}
                  <div className="absolute inset-0 -z-10">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute top-1/2 left-1/2 w-12 h-1 bg-yellow-400"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Main Title - Professional Comic Book Style */}
                <div className="text-center mb-4">
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-2">
                    <span className="inline-block text-stroke-3 text-white drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                      GABRIEL
                    </span>
                  </h1>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none">
                    <span className="inline-block text-stroke-3 text-yellow-300 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                      MEREDITH
                    </span>
                  </h1>
                </div>

                {/* Subtitle with comic burst */}
                <div className="relative mb-4">
                  <div className="bg-white border-4 border-black px-6 py-2 transform rotate-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-base md:text-xl font-black uppercase tracking-wide">
                      Computer Science @ Cornell
                    </p>
                  </div>
                </div>

                {/* Issue badge */}
                <div className="relative mb-4">
                  <div className="bg-blue-500 border-4 border-black px-6 py-2 transform -rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-black text-white text-sm md:text-lg uppercase italic">
                      Developer • Problem Solver
                    </p>
                  </div>
                </div>

                {/* Author credit box */}
                <div className="bg-red-500 border-4 border-black px-5 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                  <p className="font-black text-white text-xs md:text-sm uppercase tracking-wider">
                    Issue #001 • 2025
                  </p>
                </div>

                {/* Click instruction with arrow */}
                {!animating && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                    <div className="bg-yellow-300 border-4 border-black px-4 py-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-black uppercase text-xs flex items-center gap-2">
                        <span>Click to Read</span>
                        <span className="text-lg">→</span>
                      </p>
                    </div>
                  </div>
                )}

                {/* Comic corner badges */}
                <div className="absolute top-2 left-2 bg-red-500 border-2 border-black w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transform -rotate-12">
                  <span className="font-black text-white text-lg md:text-xl">#1</span>
                </div>
                <div className="absolute top-2 right-2 bg-yellow-300 border-2 border-black px-2 py-1 transform rotate-12">
                  <span className="font-black text-xs uppercase">New</span>
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
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`
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
          <div className="max-w-7xl mx-auto bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
              <div className="text-3xl font-black italic transform -skew-x-6">
                <span className="text-red-600">GM</span>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 items-center font-bold">
                {["Story", "Projects", "Skills", "Contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-black hover:text-red-600 transition-colors uppercase tracking-wider text-sm relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 bg-red-600 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Cover Page / Hero */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-24 pb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-red-200 to-blue-200" />
          
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-[800px] h-[800px] rounded-full border-[60px] border-black animate-pulse" />
          </div>

          <div className="relative z-10 text-center max-w-4xl">
            <div className="mb-8">
              <div className="inline-block bg-yellow-300 border-4 border-black px-8 py-2 transform -rotate-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-sm font-black uppercase tracking-widest">Issue #1</p>
              </div>
            </div>

            <h1 className="text-7xl md:text-9xl font-black mb-6 italic transform -skew-y-2">
              <span className="inline-block text-stroke-3 text-white drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                GABE
              </span>
              <br />
              <span className="inline-block text-stroke-3 text-red-600 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                MEREDITH
              </span>
            </h1>

            <div className="inline-block bg-white border-4 border-black px-8 py-4 transform rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
              <p className="text-2xl font-bold uppercase tracking-wide">
                Origin Story: CS @ Cornell
              </p>
            </div>

            <div className="relative inline-block mt-8 max-w-md mb-20">
              <div className="bg-white border-4 border-black rounded-3xl px-8 py-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-comic text-xl font-bold">
                  "Every great developer has an origin story..."
                </p>
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-[20px] border-l-transparent border-t-[30px] border-t-black border-r-[20px] border-r-transparent" />
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-[-26px] w-0 h-0 border-l-[16px] border-l-transparent border-t-[26px] border-t-white border-r-[16px] border-r-transparent" />
              </div>
            </div>

            <div className="mt-12 flex justify-center animate-bounce">
              <div className="bg-yellow-300 border-4 border-black rounded-full p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ChevronDown className="w-8 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Panel 1 - The Beginning */}
        <section 
          id="story"
          data-panel="0"
          className={`min-h-screen px-6 py-20 transition-all duration-1000 ${
            visiblePanels.includes(0) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2">
              <div className="bg-red-600 border-4 border-black px-4 py-2 -mt-6 -mx-6 mb-4">
                <h2 className="text-white text-3xl font-black uppercase tracking-wider text-center">
                  Chapter One: The Early Days
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="border-4 border-black bg-gradient-to-br from-blue-100 to-cyan-100 p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute top-4 left-4 bg-yellow-300 border-2 border-black px-3 py-1 transform -rotate-6">
                    <p className="text-xs font-black uppercase">Panel 1</p>
                  </div>
                  <img
                    src="/professional-headshot.png"
                    alt="Gabriel Meredith"
                    className="w-64 h-64 rounded-full object-cover border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div className="border-4 border-black bg-white p-6 space-y-4 relative">
                  <div className="bg-yellow-100 border-3 border-black p-4 italic">
                    <p className="font-comic text-sm leading-relaxed">
                      <strong className="block text-xs uppercase mb-1">Somewhere in Warrensburg, NY...</strong>
                      Growing up, I was always fascinated by how things worked. Not just physically, but logically. 
                      How do computers think? How do algorithms solve problems? How can we teach machines to learn?
                    </p>
                  </div>

                  <div className="relative mt-6">
                    <div className="bg-white border-3 border-black rounded-2xl px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <p className="font-comic font-bold">
                        "I'm going to study Computer Science at Cornell and build things that matter!"
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
        <section 
          id="projects"
          data-panel="1"
          className={`min-h-screen px-6 py-20 transition-all duration-1000 delay-200 ${
            visiblePanels.includes(1) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2">
              <div className="bg-blue-600 border-4 border-black px-4 py-2 -mt-6 -mx-6 mb-4">
                <h2 className="text-white text-3xl font-black uppercase tracking-wider text-center">
                  Chapter Two: The Adventures
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                {projects.map((project, i) => (
                  <div
                    key={project.title}
                    className="border-4 border-black bg-white p-6 relative transition-all duration-300 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2"
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
        <section 
          id="skills"
          data-panel="2"
          className={`min-h-screen px-6 py-20 transition-all duration-1000 delay-300 ${
            visiblePanels.includes(2) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2">
              <div className="bg-emerald-600 border-4 border-black px-4 py-2 -mt-6 -mx-6 mb-4">
                <h2 className="text-white text-3xl font-black uppercase tracking-wider text-center">
                  Chapter Three: The Arsenal
                </h2>
              </div>

              <div className="p-6 pb-0">
                <div className="relative max-w-2xl mx-auto mb-8">
                  <div className="bg-white border-4 border-black rounded-full px-8 py-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-comic font-bold text-center italic">
                      "Every hero needs their tools and powers..."
                    </p>
                  </div>
                  <div className="absolute -bottom-6 left-1/4">
                    <div className="w-6 h-6 bg-white border-3 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                  </div>
                  <div className="absolute -bottom-10 left-1/4 -ml-4">
                    <div className="w-4 h-4 bg-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                {skillCategories.map((category, i) => (
                  <div
                    key={category.title}
                    className="border-4 border-black bg-white p-6 space-y-4 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
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
                          className="bg-yellow-100 border-2 border-black px-3 py-2 text-sm font-bold transform hover:translate-x-1 transition-transform"
                        >
                          • {skill}
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
          data-panel="3"
          className={`min-h-screen px-6 py-20 flex items-center justify-center transition-all duration-1000 delay-400 ${
            visiblePanels.includes(3) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
        >
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-white border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-2">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 border-4 border-black px-4 py-2 -mt-6 -mx-6 mb-4">
                <h2 className="text-white text-3xl font-black uppercase tracking-wider text-center">
                  To Be Continued...
                </h2>
              </div>

              <div className="p-8 text-center space-y-6">
                <div className="relative inline-block max-w-2xl">
                  <div className="bg-cyan-100 border-4 border-black rounded-3xl px-10 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    <p className="font-comic text-2xl font-bold mb-4">
                      "Want to join the next chapter of this story?"
                    </p>
                    <p className="font-comic text-lg">
                      I'm always looking for new adventures, whether it's projects, opportunities, or just a good tech conversation!
                    </p>
                  </div>
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-[25px] border-l-transparent border-t-[40px] border-t-black border-r-[25px] border-r-transparent" />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-[-36px] w-0 h-0 border-l-[21px] border-l-transparent border-t-[36px] border-t-cyan-100 border-r-[21px] border-r-transparent" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-12">
                  <a
                    href="mailto:gabriel.b.meredith@gmail.com"
                    className="bg-red-600 text-white border-4 border-black px-8 py-4 text-xl font-black uppercase hover:bg-red-700 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] inline-flex items-center justify-center gap-2"
                  >
                    <Mail className="w-6 h-6" />
                    Email Me
                  </a>
                  <a
                    href="https://github.com/gabemeredith"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black text-white border-4 border-black px-8 py-4 text-xl font-black uppercase hover:bg-gray-800 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] inline-flex items-center justify-center gap-2"
                  >
                    <Github className="w-6 h-6" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/gabriel-meredith"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white border-4 border-black px-8 py-4 text-xl font-black uppercase hover:bg-blue-700 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] inline-flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-6 h-6" />
                    LinkedIn
                  </a>
                </div>

                <div className="pt-8">
                  <div className="inline-block bg-black text-white border-4 border-black px-6 py-3 transform rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
              © 2025 Gabriel Meredith. Made with ❤️ and lots of ☕
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