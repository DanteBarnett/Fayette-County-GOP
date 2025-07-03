import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames'

const navLinks = [
  { to: '/mission', label: 'Our Mission' },
  { to: '/issues', label: 'Top Issues' },
  { to: '/events', label: 'Events' },
  { to: '/news', label: 'News' },
]

function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={classNames(
        'fixed inset-x-0 top-0 z-50 transition-all',
        scrolled ? 'h-16 backdrop-blur-md shadow-sm' : 'h-24',
      )}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-2xl font-serif font-bold text-navy">
          FCRP
        </Link>
        <ul className="hidden gap-8 md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  classNames(
                    'text-lg font-medium transition-colors',
                    isActive ? 'text-red' : 'text-navy hover:text-red',
                  )
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <a
          href="/donate"
          className="rounded-full bg-red px-5 py-2 text-white transition hover:opacity-90"
        >
          Donate
        </a>
      </nav>
    </header>
  )
}

export default NavBar