'use client'

import { AlertCircle, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import { updateAgendaEventStatus } from '@/app/actions'
import NewAgendaEventDialog from './NewAgendaEventDialog'

export default function AgendaSidebar({ events }: { events: any[] }) {
  const today = new Date(new Date().setHours(0,0,0,0))

  const pendingEvents = events.filter(e => e.status !== 'CONCLUIDO')

  const delayedEvents = pendingEvents.filter(e => new Date(e.date) < today)
  const highPriorityEvents = pendingEvents.filter(e => e.priority === 'ALTA' && !delayedEvents.includes(e))
  
  // Próximos 7 dias
  const next7Days = new Date(today)
  next7Days.setDate(next7Days.getDate() + 7)
  const upcomingEvents = pendingEvents.filter(e => {
    const d = new Date(e.date)
    return d >= today && d <= next7Days && e.priority !== 'ALTA'
  })

  async function handleComplete(id: string) {
    await updateAgendaEventStatus(id, 'CONCLUIDO')
  }

  function EventCard({ event, type }: { event: any, type: 'delayed' | 'high' | 'upcoming' }) {
    const colorClass = 
      type === 'delayed' ? 'bg-red-50 border-red-100 text-red-900' :
      type === 'high' ? 'bg-orange-50 border-orange-100 text-orange-900' :
      'bg-zinc-50 border-zinc-100 text-zinc-900'
    
    const iconColor = 
      type === 'delayed' ? 'text-red-500' :
      type === 'high' ? 'text-orange-500' :
      'text-zinc-400'

    const badgeColor =
      type === 'delayed' ? 'bg-red-100 text-red-700' :
      type === 'high' ? 'bg-orange-100 text-orange-700' :
      'bg-zinc-200 text-zinc-700'

    return (
      <div className={`p-4 rounded-2xl border ${colorClass} flex flex-col gap-3 group relative overflow-hidden transition-all hover:shadow-sm`}>
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h4 className="font-bold text-[14px] leading-tight mb-1">{event.title}</h4>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className={`px-2 py-0.5 rounded-md ${badgeColor}`}>{event.type}</span>
              <span className="flex items-center gap-1 opacity-70">
                <Clock size={12} />
                {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} 
                {event.time ? ` às ${event.time}` : ''}
              </span>
            </div>
          </div>
          <button 
            onClick={() => handleComplete(event.id)}
            title="Marcar como concluído"
            className={`shrink-0 p-1.5 rounded-full bg-white shadow-sm border border-black/5 hover:bg-green-500 hover:text-white hover:border-green-500 transition-colors ${iconColor}`}
          >
            <CheckCircle2 size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[320px] shrink-0 bg-white/60 backdrop-blur-2xl border border-white/60 rounded-[32px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] sticky top-6 h-[calc(100vh-100px)] flex flex-col overflow-hidden">
      <div className="p-6 border-b border-black/5 shrink-0">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 mb-5">Visão Geral</h2>
        <NewAgendaEventDialog>
          <button className="w-full relative overflow-hidden group bg-zinc-900 text-white rounded-2xl py-3.5 px-4 text-[14px] font-bold shadow-[0_8px_30px_-8px_rgba(0,0,0,0.5)] hover:bg-zinc-800 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            + Novo Compromisso
          </button>
        </NewAgendaEventDialog>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
        
        {delayedEvents.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-red-500 uppercase tracking-widest flex items-center gap-2 mb-3">
              <AlertCircle size={14} /> Atrasados ({delayedEvents.length})
            </h3>
            <div className="space-y-3">
              {delayedEvents.map(e => <EventCard key={e.id} event={e} type="delayed" />)}
            </div>
          </div>
        )}

        {highPriorityEvents.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-orange-500 uppercase tracking-widest flex items-center gap-2 mb-3">
              Prioridade Alta ({highPriorityEvents.length})
            </h3>
            <div className="space-y-3">
              {highPriorityEvents.map(e => <EventCard key={e.id} event={e} type="high" />)}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2 mb-3">
            Próximos 7 Dias
          </h3>
          <div className="space-y-3">
            {upcomingEvents.length === 0 ? (
              <p className="text-sm font-medium text-zinc-400 p-4 border border-dashed border-zinc-200 rounded-2xl text-center">Nenhum compromisso próximo.</p>
            ) : (
              upcomingEvents.map(e => <EventCard key={e.id} event={e} type="upcoming" />)
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
