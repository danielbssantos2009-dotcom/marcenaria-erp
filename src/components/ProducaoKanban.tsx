'use client'

import { useState } from 'react'
import { updateProductionStatus, sendToInstallation } from '@/app/actions'
import { CheckCircle2, ChevronRight, Scissors, Layers, Hammer, Truck, Clock } from 'lucide-react'

const COLUMNS = [
  { id: 'FILA', title: 'Na Fila (Projeto)', icon: <Clock size={16} /> },
  { id: 'CORTE', title: 'Corte (Serra)', icon: <Scissors size={16} /> },
  { id: 'FITA', title: 'Fita de Borda', icon: <Layers size={16} /> },
  { id: 'MONTAGEM', title: 'Usinagem / Montagem', icon: <Hammer size={16} /> },
  { id: 'PRONTO', title: 'Expedição', icon: <Truck size={16} /> }
]

export default function ProducaoKanban({ projects }: { projects: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function handleMove(projectId: string, newStatus: string) {
    setLoadingId(projectId)
    await updateProductionStatus(projectId, newStatus)
    setLoadingId(null)
  }

  async function handleSendToInstalation(projectId: string) {
    if (!confirm('Enviar este projeto para a fila de Instalação (sai da fábrica)?')) return
    setLoadingId(projectId)
    await sendToInstallation(projectId)
    setLoadingId(null)
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory">
      {COLUMNS.map(col => {
        const colProjects = projects.filter(p => p.productionStatus === col.id || (!p.productionStatus && col.id === 'FILA'))
        
        return (
          <div key={col.id} className="min-w-[320px] w-[320px] shrink-0 flex flex-col snap-start">
            <div className="flex items-center gap-2 mb-4 px-2">
              <div className="w-8 h-8 rounded-full bg-white/60 shadow-sm flex items-center justify-center text-zinc-600">
                {col.icon}
              </div>
              <h3 className="font-bold text-zinc-800 tracking-tight">{col.title}</h3>
              <span className="ml-auto bg-zinc-200/50 text-zinc-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {colProjects.length}
              </span>
            </div>

            <div className="flex-1 space-y-4">
              {colProjects.length === 0 ? (
                <div className="h-[120px] rounded-3xl border-2 border-dashed border-zinc-200/50 flex items-center justify-center text-sm font-medium text-zinc-400">
                  Nenhum projeto
                </div>
              ) : (
                colProjects.map(project => {
                  const isLate = project.deadline ? new Date(project.deadline) < new Date() : false

                  return (
                    <div 
                      key={project.id} 
                      className={`bg-white/60 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] border transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] flex flex-col group relative ${isLate ? 'border-red-500/50 bg-red-50/30' : 'border-white/80'}`}
                    >
                      {loadingId === project.id && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-3xl z-10 flex items-center justify-center">
                          <span className="animate-pulse font-bold text-zinc-500">Movendo...</span>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-zinc-900 leading-tight text-[15px]">{project.name}</h4>
                        {isLate && (
                          <div className="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-lg shrink-0 uppercase animate-pulse">
                            Atrasado
                          </div>
                        )}
                      </div>
                      
                      <div className="text-sm font-medium text-zinc-500 mb-4 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                        {project.client.name}
                      </div>

                      {project.deadline && (
                        <div className={`text-[11px] font-bold uppercase tracking-wider mb-4 ${isLate ? 'text-red-500' : 'text-zinc-400'}`}>
                          Prazo: {new Date(project.deadline).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                        </div>
                      )}

                      <div className="mt-auto pt-4 border-t border-black/5 flex items-center gap-2">
                        {col.id === 'PRONTO' ? (
                          <button 
                            onClick={() => handleSendToInstalation(project.id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] shadow-md shadow-black/10"
                          >
                            <Truck size={16} /> Para Instalação
                          </button>
                        ) : (
                          <button 
                            onClick={() => {
                              const nextColIndex = COLUMNS.findIndex(c => c.id === col.id) + 1
                              if (nextColIndex < COLUMNS.length) {
                                handleMove(project.id, COLUMNS[nextColIndex].id)
                              }
                            }}
                            className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] shadow-md shadow-black/10"
                          >
                            Avançar Etapa <ChevronRight size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
