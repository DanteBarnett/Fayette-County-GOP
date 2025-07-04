import { useState } from 'react'

const links = [
  { href: '/about/', label: 'About' },
  { href: '/events/', label: 'Events' },
  { href: '/news/', label: 'News' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/contact/', label: 'Contact' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-white shadow fixed w-full z-30" aria-label="Main navigation">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-patriotBlue font-bold text-xl">
          Fayette GOP
        </a>
        <button
          className="md:hidden text-patriotBlue focus:outline-none focus-visible:ring-2 focus-visible:ring-patriotBlue"
          aria-controls="primary-navigation"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
          <span className="sr-only">Menu</span>
        </button>
        <ul
          id="primary-navigation"
          className={`${open ? 'block' : 'hidden'} md:flex space-y-4 md:space-y-0 md:space-x-8 font-medium mt-4 md:mt-0`}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="hover:text-patriotRed focus-visible:ring-2 focus-visible:ring-patriotBlue rounded"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}