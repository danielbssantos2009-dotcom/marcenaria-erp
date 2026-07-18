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
    const res = await addClient(formData)
    
    if (res?.error) {
      alert(res.error)
      setLoading(false)
      return
    }

    setLoading(false)
    setIsOpen(false)
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="btn-neo btn-neo-dark px-5 py-2.5 text-[14px]"
      >
        + Novo Cliente
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[28px] p-8 w-full max-w-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-6">Cadastrar Cliente</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Nome / Empresa</label>
                <input required type="text" name="name" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Telefone</label>
                <input 
                  type="tel" 
                  name="phone" 
                  pattern="[\+0-9\-\(\)\s]{8,25}"
                  title="O número deve conter no mínimo 8 dígitos (pode usar +, - e parênteses)"
                  onInput={(e) => { e.currentTarget.value = e.currentTarget.value.replace(/[^\d\+\-\(\)\s]/g, '') }}
                  className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" 
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Endereço</label>
                <input type="text" name="address" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
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
