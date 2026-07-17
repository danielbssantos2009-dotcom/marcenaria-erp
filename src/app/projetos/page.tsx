export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import NewProjectDialog from '@/components/NewProjectDialog'

const prisma = new PrismaClient()

export default async function ProjetosPage() {
  // Busca todos os projetos que NÃO são orçamento
  const projects = await prisma.project.findMany({
    where: { status: { not: 'ORCAMENTO' } },
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
          <h1 className="text-3xl font-extrabold tracking-tight">Projetos</h1>
          <p className="text-sm text-zinc-500 mt-1">Obras aprovadas e em andamento.</p>
        </div>
        <NewProjectDialog clients={clients} />
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <th className="p-4">Nome do Projeto</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Status</th>
              <th className="p-4">Valor</th>
              <th className="p-4">Prazo</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500 text-sm">
                  Nenhum projeto em andamento.
                </td>
              </tr>
            ) : (
              projects.map(project => (
                <tr key={project.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                  <td className="p-4 font-bold text-sm text-[var(--color-brand-dark)]">{project.name}</td>
                  <td className="p-4 font-medium text-sm text-zinc-600">{project.client.name}</td>
                  <td className="p-4">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                      {project.status}
                    </span>
                  </td>
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
