const EVENTS = [
  { time: '10:00', title: 'Doors open & registration', tag: 'Arrival' },
  { time: '10:45', title: 'Opening & theme reveal', tag: 'Session 1' },
  { time: '11:00', title: 'Talks — Fragment', tag: 'Session 1' },
  { time: '13:00', title: 'Networking lunch', tag: 'Break' },
  { time: '14:00', title: 'Talks — Wander', tag: 'Session 2' },
  { time: '16:00', title: 'Performance interlude', tag: 'Break' },
  { time: '16:30', title: 'Talks — Assemble', tag: 'Session 3' },
  { time: '18:00', title: 'Closing & after-party', tag: 'Wrap' },
];

export default function Schedule() {
  return (
    <section id="schedule" className="bg-[var(--cream)] text-black px-6 md:px-24 py-24">
      <p className="font-pixel text-[var(--brand-red)] uppercase tracking-[0.3em] mb-4">Run of show</p>
      <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">Schedule</h2>

      <div className="max-w-5xl mx-auto border border-black bg-white">
        {EVENTS.map((event, i) => (
          <div
            key={event.time}
            className={`flex items-center justify-between gap-4 px-6 md:px-8 py-5 ${i !== EVENTS.length - 1 ? 'border-b border-black' : ''}`}
          >
            <div className="flex items-baseline gap-8 md:gap-16 min-w-0">
              <span className="font-bold tabular-nums w-16 shrink-0">{event.time}</span>
              <span className="text-lg md:text-xl">{event.title}</span>
            </div>
            <span className="shrink-0 text-[10px] uppercase tracking-widest border border-black px-2 py-1">
              {event.tag}
            </span>
          </div>
        ))}
      </div>
      <p className="max-w-5xl mx-auto mt-4 text-xs text-neutral-500">Times are indicative and subject to change.</p>
    </section>
  );
}
