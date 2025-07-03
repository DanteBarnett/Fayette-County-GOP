/* global gsap */
import { gsap } from 'https://cdn.jsdelivr.net/npm/gsap@3.12.2/+esm'

// HERO DROP-IN WORDS
function animateHero() {
  const heroHeading = document.querySelector('[data-hero-heading]')
  if (!heroHeading) return

  const words = heroHeading.textContent.trim().split(/\s+/)
  heroHeading.textContent = ''

  words.forEach((word) => {
    const outer = document.createElement('span')
    outer.style.overflow = 'hidden'
    outer.style.display = 'inline-block'
    const inner = document.createElement('span')
    inner.textContent = word + ' '
    inner.style.display = 'inline-block'
    inner.style.transform = 'translateY(100%)'
    outer.appendChild(inner)
    heroHeading.appendChild(outer)
  })

  const inners = heroHeading.querySelectorAll('span > span')
  gsap.to(inners, {
    y: 0,
    duration: 0.8,
    opacity: 1,
    ease: 'back.out(1.7)',
    stagger: 0.1,
  })
}

document.addEventListener('DOMContentLoaded', animateHero)

// STICKY CTA
const sticky = document.getElementById('sticky-cta')
if (sticky) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) sticky.classList.add('visible')
    else sticky.classList.remove('visible')
  })
}

// PARALLAX HERO IMAGE
const parallaxElems = document.querySelectorAll('.parallax')
window.addEventListener('scroll', () => {
  const offset = window.scrollY
  parallaxElems.forEach((el) => {
    el.style.transform = `translateY(${offset * 0.3}px)`
  })
})

// SLIDE-IN ON SCROLL FOR EVENT CARDS
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.2 },
)

document.querySelectorAll('[data-slide-in]').forEach((el) => observer.observe(el))

// LIGHTBOX FOR GALLERY
const gallery = document.querySelector('.masonry')
if (gallery) {
  import('https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js').then(({ default: basicLightbox }) => {
    gallery.querySelectorAll('img').forEach((img) => {
      img.style.cursor = 'zoom-in'
      img.addEventListener('click', () => {
        basicLightbox
          .create(`<img src="${img.src}" alt="${img.alt}" style="max-width:100%;max-height:100vh">`)
          .show()
      })
    })
  })
}

// REMOVE SPLASH AFTER LOAD
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash')?.remove()
  }, 1100)
})