'use client'

import { useState, useTransition } from 'react'
import { updateProjectStatus } from '@/app/actions'

const STATUS_OPTIONS = [
  { value: 'ORCAMENTO', label: 'Orçamento' },
  { value: 'PRODUCAO', label: 'Em Produção' },
  { value: 'INSTALACAO', label: 'Em Instalação' },
  { value: 'CONCLUIDO', label: 'Concluído' },
]

export default function StatusDropdown({ projectId, currentStatus }: { projectId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition()
  
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    startTransition(() => {
      updateProjectStatus(projectId, newStatus)
    })
  }

  return (
    <select 
      value={currentStatus} 
      onChange={handleChange}
      disabled={isPending}
      className={\`border border-zinc-200 text-xs font-bold uppercase tracking-wider rounded px-2 py-1 outline-none \${isPending ? 'opacity-50' : 'cursor-pointer'}\`}
    >
      {STATUS_OPTIONS.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  )
}
