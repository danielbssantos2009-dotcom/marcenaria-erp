'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import NewAgendaEventDialog from './NewAgendaEventDialog'
import { updateAgendaEventStatus } from '@/app/actions'

const DAYS_OF_WEEK = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  // Returns 0-6 where 0 is Sunday, 1 is Monday. We want 0 to be Monday.
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

export default function CalendarGrid({ events }: { events: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDateStr, setSelectedDateStr] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  // Generate grid array
  const grid = []
  // Previous month padding
  const prevMonthDays = getDaysInMonth(year, month === 0 ? 11 : month - 1)
  for (let i = 0; i < firstDay; i++) {
    const d = prevMonthDays - firstDay + i + 1
    const dateObj = new Date(year, month - 1, d)
    grid.push({ date: dateObj, isCurrentMonth: false })
  }
  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const dateObj = new Date(year, month, i)
    grid.push({ date: dateObj, isCurrentMonth: true })
  }
  // Next month padding
  const remaining = grid.length % 7
  if (remaining !== 0) {
    const padding = 7 - remaining
    for (let i = 1; i <= padding; i++) {
      const dateObj = new Date(year, month + 1, i)
      grid.push({ date: dateObj, isCurrentMonth: false })
    }
  }

  function handlePrevMonth() {
    setCurrentDate(new Date(year, month - 1, 1))
  }
  function handleNextMonth() {
    setCurrentDate(new Date(year, month + 1, 1))
  }
  function handleToday() {
    setCurrentDate(new Date())
  }

  function handleDayClick(date: Date) {
    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')
    setSelectedDateStr(`${yyyy}-${mm}-${dd}`)
    setIsDialogOpen(true)
  }

  async function handleToggleStatus(e: React.MouseEvent, eventId: string, currentStatus: string) {
    e.stopPropagation()
    const newStatus = currentStatus === 'CONCLUIDO' ? 'PENDENTE' : 'CONCLUIDO'
    await updateAgendaEventStatus(eventId, newStatus)
  }

  const today = new Date()
  const isToday = (d: Date) => d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()

  const rows = grid.length / 7

  return (
    <div className="bg-white/60 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-zinc-100 shrink-0">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-zinc-900 w-[200px]">
            {MONTHS[month]} <span className="text-zinc-400 font-medium">{year}</span>
          </h2>
          <div className="flex items-center bg-zinc-50 rounded-xl p-1 border border-zinc-100">
            <button onClick={handlePrevMonth} className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-zinc-500 transition-all"><ChevronLeft size={20} /></button>
            <button onClick={handleToday} className="px-4 py-1.5 text-sm font-bold text-zinc-700 hover:bg-white hover:shadow-sm rounded-lg transition-all">Hoje</button>
            <button onClick={handleNextMonth} className="p-2 rounded-lg hover:bg-white hover:shadow-sm text-zinc-500 transition-all"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-zinc-100 bg-zinc-50/50 shrink-0">
          {DAYS_OF_WEEK.map((day, i) => (
            <div key={i} className="py-3 text-center text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>

        {/* Days Cells */}
        <div 
          className="flex-1 grid grid-cols-7"
          style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
        >
          {grid.map((cell, i) => {
            const cellEvents = events.filter(e => {
              const d = new Date(e.date)
              return d.getDate() === cell.date.getDate() && d.getMonth() === cell.date.getMonth() && d.getFullYear() === cell.date.getFullYear()
            })

            return (
              <div 
                key={i} 
                onClick={() => handleDayClick(cell.date)}
                className={`min-h-0 p-2 border-r border-b border-black/5 last:border-r-0 cursor-pointer transition-colors hover:bg-white/80 flex flex-col
                  ${!cell.isCurrentMonth ? 'bg-black/[0.02]' : 'bg-white/40'}`
                }
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold
                    ${isToday(cell.date) ? 'bg-zinc-900 text-white shadow-md' : 
                      !cell.isCurrentMonth ? 'text-zinc-400 font-medium' : 'text-zinc-700'}`
                  }>
                    {cell.date.getDate()}
                  </span>
                </div>
                
                <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-hide pr-1">
                  {cellEvents.map(e => {
                    const isConcluido = e.status === 'CONCLUIDO'
                    const priorityColor = 
                      e.priority === 'ALTA' ? 'bg-orange-100 text-orange-700 border-orange-200' : 
                      e.priority === 'BAIXA' ? 'bg-zinc-100 text-zinc-600 border-zinc-200' : 
                      'bg-blue-50 text-blue-700 border-blue-100'

                    return (
                      <div 
                        key={e.id}
                        onClick={(evt) => {
                           // Se não clicar no ícone de check, a div inteira dispara o click do dia e abre a modal de adicionar.
                           // Se quiser editar no futuro, aqui seria o lugar.
                        }}
                        className={`text-[11px] font-bold px-2 py-1.5 rounded-lg border flex items-start gap-1.5 transition-opacity ${isConcluido ? 'opacity-40 grayscale' : ''} ${priorityColor}`}
                      >
                        <button 
                          onClick={(evt) => handleToggleStatus(evt, e.id, e.status)}
                          className="shrink-0 mt-0.5 hover:scale-110 transition-transform"
                        >
                          <CheckCircle2 size={12} className={isConcluido ? 'text-green-600' : ''} />
                        </button>
                        <div className="leading-tight truncate flex-1">
                          {e.time && <span className="opacity-70 mr-1">{e.time}</span>}
                          {e.title}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <NewAgendaEventDialog 
        isOpenProp={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        defaultDate={selectedDateStr}
      />
    </div>
  )
}
