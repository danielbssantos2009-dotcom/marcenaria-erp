'use client'

import { useState } from 'react'
import { addProject } from '@/app/actions'

interface Client {
  id: string
  name: string
}

export default function NewProjectDialog({ clients, defaultIsBudget = false }: { clients: Client[], defaultIsBudget?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await addProject(formData)
    setLoading(false)
    setIsOpen(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[var(--color-brand-dark)] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-zinc-800 transition-colors"
      >
        + {defaultIsBudget ? 'Novo Orçamento' : 'Novo Projeto'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-4 tracking-tight">{defaultIsBudget ? 'Criar Orçamento' : 'Cadastrar Projeto'}</h2>
            
            {clients.length === 0 ? (
              <div className="text-sm text-zinc-500 py-4">
                Você precisa cadastrar um cliente primeiro antes de criar um projeto ou orçamento.
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-zinc-200 rounded text-xs font-bold">Fechar</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Cliente</label>
                  <select required name="clientId" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400">
                    <option value="">Selecione um cliente...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Nome do Projeto/Obra</label>
                  <input required type="text" name="name" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Valor (R$)</label>
                  <input required type="number" step="0.01" name="value" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Prazo de Entrega (Opcional)</label>
                  <input type="date" name="deadline" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400" />
                </div>

                <label className="flex items-center gap-2 mt-2">
                  <input type="checkbox" name="isBudget" defaultChecked={defaultIsBudget} />
                  <span className="text-sm font-medium text-zinc-700">Este é apenas um orçamento (ainda não fechado)</span>
                </label>
                
                <div className="flex gap-3 justify-end mt-8 pt-4 border-t border-zinc-100">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:bg-zinc-100 rounded transition-colors"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="px-6 py-2 text-xs font-bold uppercase tracking-wider bg-[var(--color-brand-blue)] text-white hover:opacity-90 rounded transition-opacity disabled:opacity-50"
                  >
                    {loading ? 'Salvando...' : 'Salvar'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
