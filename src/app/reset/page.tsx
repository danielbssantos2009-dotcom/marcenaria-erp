'use client'

import { useState } from 'react'
import { wipeDatabase } from '@/app/actions'

export default function ResetPage() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleWipe() {
    if (confirm("TEM CERTEZA ABSOLUTA? Isso vai apagar TODOS os clientes, projetos, e financeiro para sempre!")) {
      setLoading(true)
      await wipeDatabase()
      setLoading(false)
      setDone(true)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <h1 className="text-4xl font-black text-red-600">ÁREA DE PERIGO</h1>
      <p className="text-zinc-500 max-w-md">
        Esta página foi criada apenas para a fase de testes. Ao clicar no botão abaixo, 
        absolutamente todos os dados do seu sistema serão deletados, deixando o sistema 
        limpo e zerado para você entrar em produção oficial.
      </p>
      
      {!done ? (
        <button 
          onClick={handleWipe}
          disabled={loading}
          className="bg-red-600 text-white px-8 py-4 text-lg font-black uppercase tracking-widest rounded shadow-xl hover:bg-red-700 hover:scale-105 transition-all"
        >
          {loading ? 'Apagando o Banco...' : 'ZERAR SISTEMA INTEIRO'}
        </button>
      ) : (
        <div className="bg-green-100 text-green-700 px-8 py-4 rounded font-bold text-lg">
          ✅ Sistema limpo com sucesso! Você já pode fechar essa aba e voltar pro painel.
        </div>
      )}
    </div>
  )
}
