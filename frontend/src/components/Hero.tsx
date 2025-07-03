import { motion } from 'framer-motion'

export interface CTAButton {
  label: string
  href: string
}

interface HeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
  buttons?: CTAButton[]
}

export default function Hero({ title, subtitle, backgroundImage, buttons }: HeroProps) {
  return (
    <section
      className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${backgroundImage ?? '/static/img/hero.jpg'})` }}
    >
      <div className="absolute inset-0 bg-blue-900/70" />
      <div className="relative z-10 text-white px-4 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold font-montserrat"
        >
          {title}
        </motion.h1>
        {subtitle && <p className="text-lg md:text-2xl">{subtitle}</p>}
        {buttons && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {buttons.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                className="px-6 py-3 bg-red-700 hover:bg-red-800 text-white rounded-md shadow"
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