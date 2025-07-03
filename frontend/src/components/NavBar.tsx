import { useState } from 'react'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="bg-white shadow fixed w-full z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-patriotBlue font-bold text-xl">
          Fayette GOP
        </a>
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-patriotBlue focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
        <ul
          className={`${open ? '' : 'hidden'} md:flex space-x-8 font-medium`}
        >
          <li>
            <a href="/about/" className="hover:text-patriotRed">
              About
            </a>
          </li>
          <li>
            <a href="/events/" className="hover:text-patriotRed">
              Events
            </a>
          </li>
          <li>
            <a href="/news/" className="hover:text-patriotRed">
              News
            </a>
          </li>
          <li>
            <a href="/gallery/" className="hover:text-patriotRed">
              Gallery
            </a>
          </li>
          <li>
            <a href="/contact/" className="hover:text-patriotRed">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}