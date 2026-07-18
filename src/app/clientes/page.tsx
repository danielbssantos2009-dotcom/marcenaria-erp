export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import NewClientDialog from '@/components/NewClientDialog'
import ClientTable from '@/components/ClientTable'

const prisma = new PrismaClient()

export default async function ClientesPage() {
  const clients = await prisma.client.findMany({
    include: {
      projects: true
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Clientes</h1>
        <NewClientDialog />
      </div>

      <ClientTable clients={clients} />
    </div>
  )
}
