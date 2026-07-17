'use client'

import { useState } from 'react'
import { addTransaction } from '@/app/actions'

export default function NewTransactionDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    await addTransaction(formData)
    setLoading(false)
    setIsOpen(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-[var(--color-brand-dark)] text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded hover:bg-zinc-800 transition-colors"
      >
        + Nova
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-4 tracking-tight">Lançar Transação</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Tipo</label>
                <select name="type" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400">
                  <option value="IN">Entrada (Receita)</option>
                  <option value="OUT">Saída (Despesa)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Descrição</label>
                <input required type="text" name="description" placeholder="Ex: Compra de material" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Valor (R$)</label>
                <input required type="number" step="0.01" name="value" placeholder="0.00" className="w-full border border-zinc-200 bg-zinc-50 p-2.5 text-sm rounded font-medium outline-none focus:border-zinc-400" />
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
