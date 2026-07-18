export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import NewProjectDialog from '@/components/NewProjectDialog'

const prisma = new PrismaClient()

export default async function ProjetosPage() {
  // Busca todos os projetos (incluindo orçamentos)
  const projects = await prisma.project.findMany({
    include: { client: true },
    orderBy: { createdAt: 'desc' }
  })
  
  const clients = await prisma.client.findMany({
    select: { id: true, name: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Projetos</h1>
          <p className="text-sm font-medium text-zinc-500 mt-1">Todos os projetos e orçamentos.</p>
        </div>
        <NewProjectDialog clients={clients} />
      </div>

      <div className="neo-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                <th className="p-5 font-semibold">Nome do Projeto</th>
                <th className="p-5 font-semibold">Cliente</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Valor</th>
                <th className="p-5 font-semibold">Prazo</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center font-medium text-zinc-500 text-sm">
                    Nenhum projeto cadastrado.
                  </td>
                </tr>
              ) : (
                projects.map(project => (
                  <tr key={project.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors">
                    <td className="p-5 font-bold text-[14px] text-zinc-900">{project.name}</td>
                    <td className="p-5 font-medium text-[14px] text-zinc-600">{project.client.name}</td>
                    <td className="p-5">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                        project.status === 'ORCAMENTO' 
                          ? 'bg-yellow-100 text-yellow-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-5 font-bold text-[14px] text-zinc-700">R$ {project.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="p-5 font-medium text-[14px] text-zinc-500">
                      {project.deadline ? new Date(project.deadline).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
