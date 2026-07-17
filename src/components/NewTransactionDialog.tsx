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
        className="btn-neo btn-neo-dark px-5 py-2.5 text-[14px]"
      >
        + Nova Transação
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[28px] p-8 w-full max-w-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-6">Lançar Transação</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Tipo</label>
                <select name="type" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all">
                  <option value="IN">Entrada (Receita)</option>
                  <option value="OUT">Saída (Despesa)</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Descrição</label>
                <input required type="text" name="description" placeholder="Ex: Compra de material" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Valor (R$)</label>
                <input required type="number" step="0.01" name="value" placeholder="0.00" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
              </div>
              
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
          </div>
        </div>
      )}
    </>
  )
}
