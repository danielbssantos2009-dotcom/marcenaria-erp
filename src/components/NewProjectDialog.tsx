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
        className="btn-neo btn-neo-dark px-5 py-2.5 text-[14px]"
      >
        + {defaultIsBudget ? 'Novo Orçamento' : 'Novo Projeto'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[28px] p-8 w-full max-w-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-6">{defaultIsBudget ? 'Criar Orçamento' : 'Cadastrar Projeto'}</h2>
            
            {clients.length === 0 ? (
              <div className="text-[15px] font-medium text-zinc-500 py-4">
                Você precisa cadastrar um cliente primeiro antes de criar um projeto ou orçamento.
                <div className="mt-8 flex justify-end">
                  <button onClick={() => setIsOpen(false)} className="btn-neo bg-zinc-100 text-zinc-600 hover:bg-zinc-200 px-6 py-3.5 text-[15px]">Fechar</button>
                </div>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)
                try {
                  const formData = new FormData(e.currentTarget)
                  const res = await addProject(formData)
                  if (res?.error) {
                    alert("Erro ao salvar: " + res.error)
                  } else {
                    setIsOpen(false)
                  }
                } catch (err: any) {
                  alert("Erro fatal: " + err.message)
                } finally {
                  setLoading(false)
                }
              }} className="space-y-5">
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Cliente</label>
                  <select required name="clientId" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all">
                    <option value="">Selecione um cliente...</option>
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Nome do Projeto/Obra</label>
                  <input required type="text" name="name" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Valor (R$)</label>
                  <input required type="number" step="0.01" name="value" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Prazo de Entrega (Opcional)</label>
                  <input type="date" name="deadline" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
                </div>

                <input type="hidden" name="isBudget" value={defaultIsBudget ? 'on' : ''} />
                
                <div className="flex gap-3 pt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsOpen(false)}
                    className="flex-1 btn-neo bg-zinc-100 text-zinc-600 hover:bg-zinc-200 py-3.5 text-[15px]"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 btn-neo btn-neo-dark py-3.5 text-[15px] disabled:opacity-50"
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
