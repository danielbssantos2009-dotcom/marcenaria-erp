'use client'

import { useState, useRef, useEffect } from 'react'
import { MoreVertical, Trash2, Archive, Briefcase, RotateCcw } from 'lucide-react'
import { deleteClient, toggleArchiveClient } from '@/app/actions'
import ClientProjectsModal from './ClientProjectsModal'

export default function ClientActionsMenu({ client, projects }: { client: any; projects: any[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  async function handleDelete() {
    if (confirm(`Tem certeza que deseja excluir permanentemente o cliente ${client.name}?`)) {
      const res = await deleteClient(client.id)
      if (res?.error) {
        alert(res.error)
      }
      setIsOpen(false)
    }
  }

  async function handleArchive() {
    const action = client.archived ? 'desarquivar' : 'arquivar'
    if (confirm(`Deseja ${action} o cliente ${client.name}?`)) {
      const res = await toggleArchiveClient(client.id, client.archived)
      if (res?.error) {
        alert(res.error)
      }
      setIsOpen(false)
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-700 transition-colors focus:outline-none"
      >
        <MoreVertical size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-zinc-100 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-100 origin-top-right">
          <div className="py-2">
            <button 
              onClick={() => {
                setIsOpen(false)
                setIsModalOpen(true)
              }}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors"
            >
              <Briefcase size={16} className="text-zinc-400" />
              Ver Projetos
            </button>
            <button 
              onClick={handleArchive}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 flex items-center gap-2 transition-colors"
            >
              {client.archived ? (
                <><RotateCcw size={16} className="text-zinc-400" /> Desarquivar</>
              ) : (
                <><Archive size={16} className="text-zinc-400" /> Arquivar</>
              )}
            </button>
            <div className="h-px bg-zinc-100 my-1"></div>
            <button 
              onClick={handleDelete}
              className="w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
            >
              <Trash2 size={16} className="text-red-500" />
              Excluir
            </button>
          </div>
        </div>
      )}

      <ClientProjectsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        client={client}
        projects={projects}
      />
    </div>
  )
}
