import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

function splitWords(text: string) {
  return text.split(' ').map((word, i) => (
    <span key={`${word}-${i}`} className="inline-block overflow-hidden">
      <span className="inline-block translate-y-20 opacity-0">{word}&nbsp;</span>
    </span>
  ))
}

const headline = 'Fayette County Republican Party'

function Hero() {
  const container = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!container.current) return
    const words = container.current.querySelectorAll('span > span')
    gsap.to(words, {
      y: 0,
      opacity: 1,
      ease: 'back.out(1.7)',
      duration: 0.8,
      stagger: 0.1,
    })
  }, [])

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-navy text-white">
      {/* Background image/video placeholder */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover opacity-50"
          src="/assets/flag-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className="relative z-10 max-w-4xl px-4 text-center">
        <h1
          ref={container}
          className="mb-8 text-4xl font-serif font-bold leading-tight md:text-6xl"
        >
          {splitWords(headline)}
        </h1>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            to="/contribute"
            className="rounded-full bg-red px-8 py-3 text-lg font-medium text-white shadow-md transition hover:opacity-90"
          >
            Contribute
          </Link>
          <Link
            to="/volunteer"
            className="rounded-full border border-white px-8 py-3 text-lg font-medium text-white transition hover:bg-white hover:text-navy"
          >
            Volunteer
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero