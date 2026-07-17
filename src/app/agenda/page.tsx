export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import NewAgendaEventDialog from '@/components/NewAgendaEventDialog'

const prisma = new PrismaClient()

export default async function AgendaPage() {
  const events = await prisma.agendaEvent.findMany({
    orderBy: [
      { date: 'asc' },
      { time: 'asc' }
    ]
  })

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Agenda</h1>
          <p className="text-sm text-zinc-500 mt-1">Seus compromissos, medições e reuniões.</p>
        </div>
        <NewAgendaEventDialog />
      </div>

      <div className="card p-0 overflow-hidden">
        <div className="divide-y divide-zinc-100">
          {events.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm">
              Nenhum evento agendado.
            </div>
          ) : (
            events.map(event => {
              const eventDate = new Date(event.date)
              // Adjust timezone offset if necessary, keeping simple for now
              const isPast = eventDate < new Date(new Date().setHours(0,0,0,0))
              
              return (
                <div key={event.id} className={\`p-6 flex items-center gap-6 transition-colors hover:bg-zinc-50 \${isPast ? 'opacity-50' : ''}\`}>
                  <div className="flex flex-col items-center justify-center bg-zinc-100 rounded-lg w-16 h-16 shrink-0">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{eventDate.toLocaleDateString('pt-BR', { month: 'short' })}</span>
                    <span className="text-2xl font-black text-[var(--color-brand-dark)] leading-none">{eventDate.getDate()}</span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[var(--color-brand-dark)] mb-1">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                      {event.time || 'Horário não definido'}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
