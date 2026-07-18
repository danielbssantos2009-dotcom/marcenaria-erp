export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import NewProjectDialog from '@/components/NewProjectDialog'
import OrcamentosKanban from '@/components/OrcamentosKanban'

const prisma = new PrismaClient()

export default async function OrcamentosPage() {
  // Busca apenas os orçamentos
  const projects = await prisma.project.findMany({
    where: { status: 'ORCAMENTO' },
    include: { client: true },
    orderBy: { createdAt: 'desc' }
  })
  
  const clients = await prisma.client.findMany({
    select: { id: true, name: true, phone: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Funil de Orçamentos</h1>
          <p className="text-sm font-medium text-zinc-500 mt-1">Acompanhe e avance suas negociações.</p>
        </div>
        <NewProjectDialog clients={clients} defaultIsBudget={true} />
      </div>

      <OrcamentosKanban projects={projects} />
    </div>
  )
}
