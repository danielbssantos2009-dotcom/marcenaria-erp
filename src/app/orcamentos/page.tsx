export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import NewProjectDialog from '@/components/NewProjectDialog'

const prisma = new PrismaClient()

export default async function OrcamentosPage() {
  // Busca apenas os orçamentos
  const projects = await prisma.project.findMany({
    where: { status: 'ORCAMENTO' },
    include: { client: true },
    orderBy: { createdAt: 'desc' }
  })
  
  const clients = await prisma.client.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Orçamentos</h1>
          <p className="text-sm text-zinc-500 mt-1">Negociações em andamento com clientes.</p>
        </div>
        <NewProjectDialog clients={clients} defaultIsBudget={true} />
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <th className="p-4">Descrição</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Valor Estimado</th>
              <th className="p-4">Data Limite</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-500 text-sm">
                  Nenhum orçamento em aberto.
                </td>
              </tr>
            ) : (
              projects.map(project => (
                <tr key={project.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                  <td className="p-4 font-bold text-sm text-[var(--color-brand-dark)]">{project.name}</td>
                  <td className="p-4 font-medium text-sm text-zinc-600">{project.client.name}</td>
                  <td className="p-4 font-bold text-sm text-zinc-700">R$ {project.value.toFixed(2)}</td>
                  <td className="p-4 font-medium text-sm text-zinc-500">
                    {project.deadline ? new Date(project.deadline).toLocaleDateString('pt-BR') : '-'}
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
