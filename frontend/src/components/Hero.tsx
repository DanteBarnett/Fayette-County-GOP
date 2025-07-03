import { motion } from 'framer-motion'

export interface CTAButton {
  label: string
  href: string
}

export interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  buttons?: CTAButton[]
}

/**
 * Hero section with animated heading and optional CTA buttons.
 * Tailwind responsive classes ensure full-width hero scales nicely.
 */
export default function Hero({ title, subtitle, backgroundImage, buttons }: HeroProps) {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${backgroundImage ?? '/static/img/hero.jpg'})` }}
      aria-label="Homepage hero"
    >
      {/* contrast overlay */}
      <div className="absolute inset-0 bg-blue-900/70" aria-hidden="true" />

      <div className="relative z-10 text-white px-4 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-4xl md:text-6xl font-bold font-montserrat"
        >
          {title}
        </motion.h1>
        {subtitle && <p className="text-lg md:text-2xl max-w-3xl mx-auto">{subtitle}</p>}
        {buttons?.length && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {buttons.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                className="px-6 py-3 bg-patriotRed hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-white text-white rounded-md shadow transition"
              >
                {btn.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}