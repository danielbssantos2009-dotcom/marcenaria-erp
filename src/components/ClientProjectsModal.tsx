'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, Briefcase, ChevronRight } from 'lucide-react'

export default function ClientProjectsModal({ 
  isOpen, 
  onClose, 
  client,
  projects 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  client: any;
  projects: any[];
}) {
  const router = useRouter()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[28px] w-full max-w-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
        <div className="p-6 border-b border-zinc-100 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900">Projetos de {client.name}</h2>
            <p className="text-sm text-zinc-500 font-medium">{projects.length} projeto(s) vinculado(s)</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 bg-zinc-50/50">
          {projects.length === 0 ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-400">
                <Briefcase size={24} />
              </div>
              <p className="text-zinc-500 font-medium">Nenhum projeto encontrado para este cliente.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.map(p => (
                <div key={p.id} className="bg-white border border-zinc-100 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-[16px] mb-1">{p.name}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        p.status === 'ORCAMENTO' ? 'bg-yellow-100 text-yellow-700' :
                        p.status === 'PRODUCAO' ? 'bg-blue-100 text-blue-700' :
                        p.status === 'INSTALACAO' ? 'bg-purple-100 text-purple-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {p.status}
                      </span>
                      <span className="text-zinc-500">
                        R$ {p.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                      {p.deadline && (
                        <span className="text-zinc-400">
                          Entrega: {new Date(p.deadline).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      onClose()
                      // Se for orçamento, vai para aba orçamento, se não, projetos ou respectiva aba
                      // Para facilitar, mandamos sempre para a aba de projetos, pois ela tem todos.
                      router.push('/projetos')
                    }}
                    className="shrink-0 flex items-center gap-1 text-sm font-bold text-[var(--color-brand-primary)] hover:text-[var(--color-brand-light)] transition-colors bg-orange-50 px-3 py-1.5 rounded-full"
                  >
                    Ver detalhes <ChevronRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-6 border-t border-zinc-100 shrink-0 bg-white rounded-b-[28px]">
           <button 
             onClick={onClose}
             className="w-full btn-neo bg-zinc-100 text-zinc-600 hover:bg-zinc-200 py-3.5 text-[15px]"
           >
             Fechar
           </button>
        </div>
      </div>
    </div>
  )
}
