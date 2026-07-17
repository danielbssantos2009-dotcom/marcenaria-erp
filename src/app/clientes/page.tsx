export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import NewClientDialog from '@/components/NewClientDialog'

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

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <th className="p-4">Nome</th>
              <th className="p-4">Contato</th>
              <th className="p-4">Endereço</th>
              <th className="p-4">Projetos Ativos</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-500 text-sm">
                  Nenhum cliente cadastrado.
                </td>
              </tr>
            ) : (
              clients.map(client => (
                <tr key={client.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                  <td className="p-4 font-bold text-sm text-[var(--color-brand-dark)]">{client.name}</td>
                  <td className="p-4 font-medium text-sm text-zinc-600">{client.phone || '-'}</td>
                  <td className="p-4 font-medium text-sm text-zinc-600">{client.address || '-'}</td>
                  <td className="p-4 font-medium text-sm">
                    <span className="bg-zinc-100 px-2 py-1 rounded text-xs font-bold text-zinc-600">
                      {client.projects.length}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
