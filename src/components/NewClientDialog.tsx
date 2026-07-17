'use client'

import { useState } from 'react'
import { addClient } from '@/app/actions'

export default function NewClientDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await addClient(formData)
    setLoading(false)
    setIsOpen(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[var(--color-brand-dark)] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-zinc-800 transition-colors"
      >
        + Novo Cliente
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-4 tracking-tight">Cadastrar Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Nome / Empresa</label>
                <input required type="text" name="name" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Telefone</label>
                <input type="text" name="phone" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Endereço</label>
                <input type="text" name="address" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400" />
              </div>
              
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
          </div>
        </div>
      )}
    </>
  )
}
