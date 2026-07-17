export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import StatusDropdown from '@/components/StatusDropdown'

const prisma = new PrismaClient()

export default async function ProducaoPage() {
  const projects = await prisma.project.findMany({
    where: { status: 'PRODUCAO' },
    include: { client: true },
    orderBy: { deadline: 'asc' }
  })

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Produção</h1>
        <p className="text-sm text-zinc-500 mt-1">Controle do chão de fábrica (Projetos em fabricação).</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-3 text-center text-zinc-500 py-12 card border-dashed">
            Nenhum projeto em produção no momento.
          </div>
        ) : (
          projects.map(project => (
            <div key={project.id} className="card border-t-4 border-t-orange-500 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg leading-tight">{project.name}</h3>
                  <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold uppercase tracking-wider">
                    Fábrica
                  </span>
                </div>
                <p className="text-sm text-zinc-600 mb-2">
                  <strong className="text-zinc-800">Cliente:</strong> {project.client.name}
                </p>
                <p className="text-sm text-zinc-600 mb-6">
                  <strong className="text-zinc-800">Prazo Final:</strong> {project.deadline ? new Date(project.deadline).toLocaleDateString('pt-BR') : 'Não definido'}
                </p>
              </div>
              
              <div className="pt-4 border-t border-zinc-100 flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Mover para:</span>
                <StatusDropdown projectId={project.id} currentStatus={project.status} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
