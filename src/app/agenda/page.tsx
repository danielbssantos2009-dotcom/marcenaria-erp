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
    <div className="animate-in fade-in zoom-in duration-300 h-[calc(100vh-160px)] -mt-2">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        <AgendaSidebar events={events} />
        <div className="flex-1 min-w-0 h-full">
          <CalendarGrid events={events} />
        </div>
      </div>
    </div>
  )
}
