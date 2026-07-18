export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import ProducaoKanban from '@/components/ProducaoKanban'

const prisma = new PrismaClient()

export default async function ProducaoPage() {
  const projects = await prisma.project.findMany({
    where: { status: 'PRODUCAO' },
    include: { client: true },
    orderBy: { deadline: 'asc' }
  })

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Produção</h1>
        <p className="text-sm font-medium text-zinc-500 mt-1">Controle Kanban do chão de fábrica.</p>
      </div>

      <ProducaoKanban projects={projects} />
    </div>
  )
}
