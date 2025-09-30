"use client"

import type React from "react"

import { useEffect, useState } from "react"
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  ExternalLink,
  Code2,
  Brain,
  Globe,
  Terminal,
  Database,
  FileCode,
  Braces,
  Box,
  Cpu,
  Eye,
  MessageSquare,
  Layers,
  Zap,
  GitBranch,
  BookOpen,
  Code,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const words = ["coding", "problem-solving", "building", "creating", "innovating"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingSpeed = 100
    const deletingSpeed = 50
    const delayBetweenWords = 2000

    const handleTyping = () => {
      const currentWord = words[currentWordIndex]

      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), delayBetweenWords)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentWordIndex, words])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "-100px",
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => sections.forEach((section) => observer.unobserve(section))
  }, [])

  const projects = [
    {
      title: "Emojify",
      description:
        "Deep learning model that analyzes sentence sentiment and assigns contextually appropriate emojis using natural language processing.",
      tech: ["Python", "TensorFlow", "NLP", "Jupyter"],
      link: "https://github.com/gabemeredith/Emojify",
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "U-NET Image Segmentation",
      description:
        "Computer vision algorithm for autonomous vehicle navigation using U-NET architecture for real-time semantic segmentation.",
      tech: ["Python", "PyTorch", "Computer Vision", "Deep Learning"],
      link: "https://github.com/gabemeredith/U-NETimgSegmentation",
      gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
      title: "Local Lens",
      description:
        "Collaborative hackathon project built during Cornell's Big Red Hacks 2025, showcasing rapid prototyping and teamwork.",
      tech: ["JavaScript", "React", "Node.js", "API Integration"],
      link: "https://hackshackll.vercel.app/",
      gradient: "from-blue-500/20 to-indigo-500/20",
    },
    {
      title: "Automated TikTok",
      description:
        "Automation tool for TikTok content management and interaction, streamlining social media workflows with intelligent scripting.",
      tech: ["Python", "Automation", "Web Scraping"],
      link: "https://github.com/gabemeredith/Automated-Tiktok",
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
  ]

  const skillCategories = [
    {
      title: "Languages",
      icon: Code2,
      skills: [
        { name: "Python", icon: FileCode },
        { name: "JavaScript", icon: Braces },
        { name: "TypeScript", icon: Code },
        { name: "SQL", icon: Database },
      ],
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
    {
      title: "AI/ML",
      icon: Brain,
      skills: [
        { name: "TensorFlow", icon: Box },
        { name: "PyTorch", icon: Cpu },
        { name: "Computer Vision", icon: Eye },
        { name: "NLP", icon: MessageSquare },
        { name: "Deep Learning", icon: Layers },
      ],
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Web Dev",
      icon: Globe,
      skills: [
        { name: "React", icon: Zap },
        { name: "Next.js", icon: Layers },
        { name: "Node.js", icon: Terminal },
        { name: "Tailwind CSS", icon: Code2 },
        { name: "REST APIs", icon: Globe },
      ],
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Tools",
      icon: Terminal,
      skills: [
        { name: "Git", icon: GitBranch },
        { name: "Jupyter", icon: BookOpen },
        { name: "VS Code", icon: Code },
      ],
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
    },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-foreground relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/30 rounded-full mix-blend-screen filter blur-3xl animate-blob" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/30 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-indigo-500/20 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div
        className="fixed inset-0 opacity-60 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent 80%)`,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "home")}
            className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:scale-110 transition-transform"
          >
            GM
          </a>
          <div className="flex gap-6 items-center">
            {["About", "Projects", "Skills", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => scrollToSection(e, item.toLowerCase())}
                className={`text-sm lg:text-base hover:text-blue-400 transition-all duration-300 relative group ${
                  activeSection === item.toLowerCase() ? "text-blue-400 font-medium" : "text-slate-300"
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-20 pb-12 relative z-10">
        <div className="max-w-4xl w-full">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight">
              <span className="inline-block animate-slide-in-left bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Gabe
              </span>{" "}
              <span className="inline-block animate-slide-in-right bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Meredith
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl animate-fade-in delay-200 font-light">
              <span className="bg-gradient-to-r from-slate-300 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                Computer Science @ Cornell University
              </span>
            </p>
            <div className="h-8 animate-fade-in delay-300">
              <p className="text-base md:text-lg lg:text-xl text-slate-400 font-mono">
                {currentText}
                <span className="inline-block w-0.5 h-5 bg-blue-400 ml-1 animate-pulse" />
              </p>
            </div>
            <div className="flex gap-4 pt-4 animate-fade-in delay-400">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0 shadow-lg shadow-blue-500/50 text-base lg:text-lg"
              >
                <a href="#projects" onClick={(e) => scrollToSection(e, "projects")}>
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-white bg-transparent backdrop-blur-sm text-base lg:text-lg"
              >
                <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
                  Get In Touch
                </a>
              </Button>
            </div>
            <div className="flex gap-4 pt-6 animate-fade-in delay-500">
              <a
                href="https://github.com/gabemeredith"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-all hover:scale-110"
              >
                <Github className="h-6 w-6 lg:h-7 lg:w-7" />
              </a>
              <a
                href="https://linkedin.com/in/gabriel-meredith"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-all hover:scale-110"
              >
                <Linkedin className="h-6 w-6 lg:h-7 lg:w-7" />
              </a>
              <a
                href="mailto:gabriel.b.meredith@gmail.com"
                className="text-slate-400 hover:text-blue-400 transition-all hover:scale-110"
              >
                <Mail className="h-6 w-6 lg:h-7 lg:w-7" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-5xl w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-12 items-center md:items-start">
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <img
                  src="/professional-headshot.png"
                  alt="Gabriel Meredith"
                  className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 rounded-full object-cover border-4 border-slate-900 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="bg-slate-900/80 backdrop-blur-lg border border-blue-500/30 rounded-lg p-4 sm:p-5 md:p-6 lg:p-8 font-mono text-xs sm:text-sm md:text-base lg:text-lg hover:border-blue-500/50 transition-all overflow-x-auto">
                <pre className="text-slate-300 leading-relaxed">
                  <span className="text-slate-500">// Hi, I'm Gabe 👋</span>
                  {"\n"}
                  <span className="text-purple-400">const</span> <span className="text-blue-300">me</span>{" "}
                  <span className="text-slate-400">=</span> {"{\n"}
                  {"  "}
                  <span className="text-cyan-300">role</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-emerald-400">"Student • Developer"</span>,{"\n"}
                  {"  "}
                  <span className="text-cyan-300">interests</span>
                  <span className="text-slate-400">:</span> [<span className="text-emerald-400">"ML/AI"</span>,{" "}
                  <span className="text-emerald-400">"Python"</span>,{" "}
                  <span className="text-emerald-400">"Cooking"</span>,{" "}
                  <span className="text-emerald-400">"Working Out"</span>],{"\n"}
                  {"  "}
                  <span className="text-cyan-300">currently</span>
                  <span className="text-slate-400">:</span>{" "}
                  <span className="text-emerald-400">"Studying CS @ Cornell University"</span>,{"\n"}
                  {"  "}
                  <span className="text-cyan-300">contact</span>
                  <span className="text-slate-400">:</span> {"{\n"}
                  {"    "}
                  <span className="text-cyan-300">github</span>
                  <span className="text-slate-400">:</span>{" "}
                  <a
                    href="https://github.com/gabemeredith"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors break-all"
                  >
                    "github.com/gabemeredith"
                  </a>
                  ,{"\n"}
                  {"    "}
                  <span className="text-cyan-300">email</span>
                  <span className="text-slate-400">:</span>{" "}
                  <a
                    href="mailto:gabriel.b.meredith@gmail.com"
                    className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors break-all"
                  >
                    "gabriel.b.meredith@gmail.com"
                  </a>
                  ,{"\n"}
                  {"    "}
                  <span className="text-cyan-300">linkedin</span>
                  <span className="text-slate-400">:</span>{" "}
                  <a
                    href="https://linkedin.com/in/gabriel-meredith"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors break-all"
                  >
                    "linkedin.com/in/gabriel-meredith"
                  </a>
                  {"\n"}
                  {"  }"}
                  {"\n"}
                  {"}"}
                  <span className="text-slate-400">;</span>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-7xl w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className="group relative overflow-hidden border-blue-500/20 bg-slate-900/50 backdrop-blur-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative p-6 lg:p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-all"
                    >
                      <ExternalLink className="h-5 w-5 lg:h-6 lg:w-6" />
                    </a>
                  </div>
                  <p className="text-slate-300 text-sm md:text-base lg:text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 lg:px-3 lg:py-1.5 bg-slate-800/50 text-slate-300 rounded text-xs md:text-sm lg:text-base border border-slate-700/50 hover:border-blue-500/50 hover:text-blue-300 transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-7xl w-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {skillCategories.map((category, index) => (
              <Card
                key={category.title}
                className="group relative overflow-hidden border-blue-500/20 bg-slate-900/50 backdrop-blur-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div
                  className={`absolute inset-0 ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                <div className="relative p-6 lg:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 lg:p-3 rounded-lg bg-slate-800/50 ${category.color} group-hover:scale-110 transition-transform`}
                    >
                      <category.icon className="h-6 w-6 lg:h-7 lg:w-7" />
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-white">{category.title}</h3>
                  </div>
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-3 bg-slate-800/50 text-slate-300 rounded-lg text-sm md:text-base lg:text-lg hover:bg-slate-700/50 transition-all hover:translate-x-1 cursor-default border border-slate-700/50 hover:border-blue-500/30"
                      >
                        <skill.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${category.color}`} />
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-12 relative z-10">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            I'm always open to discussing new projects, opportunities, or just chatting about tech. Feel free to reach
            out!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-white bg-transparent backdrop-blur-lg text-base lg:text-lg"
            >
              <a href="mailto:gabriel.b.meredith@gmail.com">
                <Mail className="mr-2 h-5 w-5 lg:h-6 lg:w-6" />
                Email
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-white bg-transparent backdrop-blur-lg text-base lg:text-lg"
            >
              <a href="https://github.com/gabemeredith" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5 lg:h-6 lg:w-6" />
                GitHub
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:text-white bg-transparent backdrop-blur-lg text-base lg:text-lg"
            >
              <a href="https://linkedin.com/in/gabriel-meredith" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5 lg:h-6 lg:w-6" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 py-8 px-6 relative z-10 backdrop-blur-md bg-slate-950/50">
        <div className="max-w-7xl mx-auto text-center text-slate-400 text-sm md:text-base lg:text-lg">
          <p>© 2025 Gabriel Meredith. Built with Next.js and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}
