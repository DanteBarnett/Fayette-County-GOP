import { motion } from 'framer-motion'

function App() {
  return (
    <div className="p-8">
      <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold">
        Fayette GOP React Widget
      </motion.h2>
      <p className="mt-4">Replace this component with interactive widgets or headless pages.</p>
    </div>
  )
}

export default App