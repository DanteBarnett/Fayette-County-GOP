import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SCROLL_TRIGGER = 400

function StickyCTA() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > SCROLL_TRIGGER)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-40 flex gap-3 rounded-full bg-white p-3 shadow-md backdrop-blur sm:gap-4"
        >
          <Link
            to="/contribute"
            className="rounded-full bg-red px-4 py-2 text-white hover:opacity-90"
          >
            Contribute
          </Link>
          <Link
            to="/volunteer"
            className="rounded-full border border-navy px-4 py-2 text-navy hover:bg-navy hover:text-white"
          >
            Volunteer
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StickyCTA