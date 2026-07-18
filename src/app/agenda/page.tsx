export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import CalendarGrid from '@/components/CalendarGrid'
import AgendaSidebar from '@/components/AgendaSidebar'

const prisma = new PrismaClient()

export default async function AgendaPage() {
  const events = await prisma.agendaEvent.findMany({
    orderBy: [
      { date: 'asc' },
      { time: 'asc' }
    ]
  })

  return (
    <div className="animate-in fade-in zoom-in duration-300">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <AgendaSidebar events={events} />
        <div className="flex-1 min-w-0 w-full">
          <CalendarGrid events={events} />
        </div>
      </div>
    </div>
  )
}
