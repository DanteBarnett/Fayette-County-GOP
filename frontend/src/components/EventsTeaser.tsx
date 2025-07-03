import { useEffect, useState } from 'react'

export interface EventItem {
  id: number
  title: string
  date: string
  url: string
}

export default function EventsTeaser() {
  const [events, setEvents] = useState<EventItem[]>([])

  useEffect(() => {
    // TODO: fetch real data from Wagtail API
    setEvents([
      { id: 1, title: 'County Convention', date: 'Aug 12, 2025', url: '/events/convention' },
      { id: 2, title: 'Fundraising Dinner', date: 'Sep 20, 2025', url: '/events/dinner' },
      { id: 3, title: 'Voter Registration Drive', date: 'Oct 5, 2025', url: '/events/drive' },
    ])
  }, [])

  if (!events.length) return null

  return (
    <section className="py-16 container mx-auto px-4" id="events">
      <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev) => (
          <a
            key={ev.id}
            href={ev.url}
            className="block bg-white shadow rounded-lg p-6 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-patriotBlue transition"
          >
            <p className="text-sm text-gray-500 mb-1">{ev.date}</p>
            <h3 className="text-lg font-semibold text-patriotBlue">{ev.title}</h3>
          </a>
        ))}
      </div>
    </section>
  )
}