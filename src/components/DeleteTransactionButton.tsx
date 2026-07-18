'use client'

import { useState } from 'react'
import { deleteTransaction } from '@/app/actions'
import { Trash2 } from 'lucide-react'

export default function DeleteTransactionButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.')) return
    
    setLoading(true)
    await deleteTransaction(id)
    setLoading(false)
  }

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Excluir Transação"
    >
      <Trash2 size={18} />
    </button>
  )
}
