interface MissionProps {
  html: string
}

export default function Mission({ html }: MissionProps) {
  return (
    <section className="py-16 bg-gray-100" id="mission">
      <div
        className="container mx-auto max-w-3xl prose lg:prose-xl px-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  )
}