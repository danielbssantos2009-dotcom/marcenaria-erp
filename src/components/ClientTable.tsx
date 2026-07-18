'use client'

import { useState } from 'react'
import ClientActionsMenu from './ClientActionsMenu'

type TabType = 'todos' | 'ativos' | 'finalizados' | 'arquivados'

export default function ClientTable({ clients }: { clients: any[] }) {
  const [activeTab, setActiveTab] = useState<TabType>('todos')

  const filteredClients = clients.filter(client => {
    const isArchived = client.archived
    const hasProjects = client.projects.length > 0
    const allFinalized = hasProjects && client.projects.every((p: any) => p.status === 'FINALIZADO' || p.status === 'ENTREGUE')
    const hasActiveProjects = hasProjects && client.projects.some((p: any) => p.status !== 'FINALIZADO' && p.status !== 'ENTREGUE' && p.status !== 'ORCAMENTO')

    if (activeTab === 'arquivados') return isArchived
    
    // As outras abas escondem os arquivados
    if (isArchived) return false

    if (activeTab === 'ativos') return !allFinalized
    if (activeTab === 'finalizados') return allFinalized
    
    return true // 'todos'
  })

  return (
    <div>
      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setActiveTab('todos')}
          className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${activeTab === 'todos' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}
        >
          Todos os Clientes
        </button>
        <button 
          onClick={() => setActiveTab('ativos')}
          className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${activeTab === 'ativos' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}
        >
          Ativos / Em andamento
        </button>
        <button 
          onClick={() => setActiveTab('finalizados')}
          className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${activeTab === 'finalizados' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}
        >
          Finalizados
        </button>
        <button 
          onClick={() => setActiveTab('arquivados')}
          className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all ${activeTab === 'arquivados' ? 'bg-zinc-900 text-white shadow-md' : 'bg-white text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'}`}
        >
          Arquivados
        </button>
      </div>

      <div className="card p-0 overflow-visible">
        <div className="overflow-x-auto overflow-y-visible">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                <th className="p-4">Nome</th>
                <th className="p-4">Contato</th>
                <th className="p-4">Endereço</th>
                <th className="p-4">Projetos</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-10 text-center text-zinc-500 text-sm">
                    Nenhum cliente encontrado nesta categoria.
                  </td>
                </tr>
              ) : (
                filteredClients.map(client => {
                  const hasProjects = client.projects.length > 0
                  const allFinalized = hasProjects && client.projects.every((p: any) => p.status === 'FINALIZADO' || p.status === 'ENTREGUE')
                  
                  return (
                    <tr key={client.id} className={`border-b border-zinc-100 last:border-0 hover:bg-zinc-50/80 transition-colors ${client.archived ? 'opacity-60 grayscale' : ''}`}>
                      <td className="p-4">
                        <div className="font-bold text-[14px] text-zinc-900">{client.name}</div>
                        {client.archived && <span className="text-[11px] font-semibold text-red-500">ARQUIVADO</span>}
                      </td>
                      <td className="p-4 font-medium text-sm text-zinc-600">{client.phone || '-'}</td>
                      <td className="p-4 font-medium text-sm text-zinc-600">{client.address || '-'}</td>
                      <td className="p-4">
                        <span className="bg-zinc-100 px-2.5 py-1 rounded-md text-xs font-bold text-zinc-700">
                          {client.projects.length}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        {allFinalized ? (
                          <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-[11px] font-bold">FINALIZADO</span>
                        ) : client.archived ? (
                          <span className="bg-zinc-200 text-zinc-600 px-2.5 py-1 rounded-full text-[11px] font-bold">INATIVO</span>
                        ) : (
                          <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-[11px] font-bold">ATIVO</span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <ClientActionsMenu client={client} projects={client.projects} />
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
