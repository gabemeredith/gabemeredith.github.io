"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations(ready: boolean) {
  const ctxRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!ready) return

    // Small delay to ensure DOM is painted
    const timeout = setTimeout(() => {
      ctxRef.current = gsap.context(() => {
        // All hero elements now match the interior page — they appear instantly.
        // Only the bouncing chevron fades in since it's not on the interior.
        gsap.from(".hero-chevron", {
          opacity: 0,
          y: 20,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out",
        })

        // --- Chapter Headers ---
        gsap.utils.toArray<HTMLElement>(".chapter-header").forEach((header) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: header,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          })

          const leftLine = header.querySelector(".line-left")
          const rightLine = header.querySelector(".line-right")
          const titleText = header.querySelector(".chapter-title")

          if (leftLine) {
            tl.from(leftLine, {
              scaleX: 0,
              duration: 0.5,
              ease: "power2.out",
              transformOrigin: "right center",
            })
          }
          if (rightLine) {
            tl.from(
              rightLine,
              {
                scaleX: 0,
                duration: 0.5,
                ease: "power2.out",
                transformOrigin: "left center",
              },
              "<"
            )
          }
          if (titleText) {
            tl.from(
              titleText,
              {
                clipPath: "inset(0 100% 0 0)",
                duration: 0.6,
                ease: "power2.out",
              },
              "-=0.3"
            )
          }
        })

        // --- Project Cards ---
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card, i) => {
          gsap.from(card, {
            y: 60,
            x: i % 2 === 0 ? -30 : 30,
            opacity: 0,
            rotateX: 5,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          })
        })

        // --- Skill Cards — each card triggers individually as you scroll ---
        gsap.utils.toArray<HTMLElement>(".skill-card").forEach((card) => {
          // Card entrance
          gsap.from(card, {
            scale: 0.85,
            opacity: 0,
            y: 40,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          })

          // Skill items inside each card — scrub-linked so they fill in as you scroll
          const items = card.querySelectorAll<HTMLElement>(".skill-item")
          if (items.length) {
            gsap.from(items, {
              x: -20,
              opacity: 0,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 50%",
                scrub: 0.5,
              },
            })
          }
        })

        // --- Speech Bubbles ---
        gsap.utils.toArray<HTMLElement>(".speech-bubble").forEach((bubble) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: bubble,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          })

          tl.from(bubble, {
            scale: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
            transformOrigin: "bottom center",
          })

          const dots = bubble.parentElement?.querySelectorAll(".speech-dot")
          if (dots?.length) {
            tl.from(
              dots,
              {
                scale: 0,
                opacity: 0,
                duration: 0.2,
                stagger: 0.1,
                ease: "back.out(2)",
              },
              "-=0.1"
            )
          }
        })

        // --- Contact CTAs ---
        gsap.from(".contact-cta", {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".contact-section",
            start: "top 75%",
            toggleActions: "play none none none",
          },
        })

        gsap.from(".end-badge", {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".end-badge",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        })

        // --- Parallax Decorative Elements ---
        gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((el) => {
          gsap.to(el, {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          })
        })

        gsap.utils.toArray<HTMLElement>(".parallax-fast").forEach((el) => {
          gsap.to(el, {
            y: -300,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          })
        })
      })
    }, 50)

    return () => {
      clearTimeout(timeout)
      ctxRef.current?.revert()
    }
  }, [ready])
}
