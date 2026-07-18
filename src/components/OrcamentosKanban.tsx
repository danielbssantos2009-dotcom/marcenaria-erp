'use client'

import { useState } from 'react'
import { updateQuoteStatus, approveQuote } from '@/app/actions'
import { CheckCircle2, MessageCircle, ChevronRight, Calculator, FileText, Phone } from 'lucide-react'

const COLUMNS = [
  { id: 'NOVO', title: 'Novos Contatos', icon: <Phone size={16} /> },
  { id: 'MEDICAO', title: 'Aguardando Medição', icon: <Calculator size={16} /> },
  { id: 'PRECIFICACAO', title: 'Em Precificação', icon: <FileText size={16} /> },
  { id: 'ENVIADO', title: 'Enviado ao Cliente', icon: <MessageCircle size={16} /> }
]

export default function OrcamentosKanban({ projects }: { projects: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null)

  async function handleMove(projectId: string, newStatus: string) {
    setLoadingId(projectId)
    await updateQuoteStatus(projectId, newStatus)
    setLoadingId(null)
  }

  async function handleApprove(projectId: string) {
    if (!confirm('Aprovar este orçamento e transformá-lo em um projeto ativo em Produção?')) return
    setLoadingId(projectId)
    await approveQuote(projectId)
    setLoadingId(null)
  }

  return (
    <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory">
      {COLUMNS.map(col => {
        const colProjects = projects.filter(p => p.quoteStatus === col.id || (!p.quoteStatus && col.id === 'NOVO'))
        
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
                  Nenhum orçamento
                </div>
              ) : (
                colProjects.map(project => {
                  const phoneStr = project.client.phone?.replace(/\D/g, '')
                  const waLink = phoneStr ? `https://wa.me/55${phoneStr}?text=Olá ${project.client.name}, tudo bem? Aqui é da marcenaria sobre o orçamento de: ${project.name}.` : null

                  return (
                    <div 
                      key={project.id} 
                      className="bg-white/60 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] border border-white/80 transition-all hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)] flex flex-col group relative"
                    >
                      {loadingId === project.id && (
                        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-3xl z-10 flex items-center justify-center">
                          <span className="animate-pulse font-bold text-zinc-500">Atualizando...</span>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-zinc-900 leading-tight text-[15px]">{project.name}</h4>
                        <div className="text-[13px] font-bold text-green-700 bg-green-100/50 px-2 py-0.5 rounded-lg shrink-0">
                          R$ {project.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                      
                      <div className="text-sm font-medium text-zinc-500 mb-4 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                        {project.client.name}
                      </div>

                      {project.deadline && (
                        <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-4">
                          Prazo: {new Date(project.deadline).toLocaleDateString('pt-BR')}
                        </div>
                      )}

                      <div className="mt-auto pt-4 border-t border-black/5 flex items-center gap-2">
                        {waLink ? (
                          <a 
                            href={waLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 py-2.5 rounded-xl text-sm font-bold transition-colors"
                          >
                            <MessageCircle size={16} /> WhatsApp
                          </a>
                        ) : (
                          <div className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 text-zinc-400 py-2.5 rounded-xl text-sm font-bold cursor-not-allowed">
                            Sem número
                          </div>
                        )}
                        
                        {col.id === 'ENVIADO' ? (
                          <button 
                            onClick={() => handleApprove(project.id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 py-2.5 rounded-xl text-sm font-bold transition-all hover:scale-[1.02] shadow-md shadow-black/10"
                          >
                            <CheckCircle2 size={16} /> Aprovar
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
                            Avançar <ChevronRight size={16} />
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
