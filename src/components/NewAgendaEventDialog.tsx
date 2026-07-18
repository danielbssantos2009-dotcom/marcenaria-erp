'use client'

import { useState } from 'react'
import { addAgendaEvent } from '@/app/actions'

export default function NewAgendaEventDialog({
  children,
  defaultDate,
  isOpenProp,
  onClose
}: {
  children?: React.ReactNode;
  defaultDate?: string;
  isOpenProp?: boolean;
  onClose?: () => void;
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const isOpen = isOpenProp !== undefined ? isOpenProp : internalIsOpen
  const close = () => {
    setInternalIsOpen(false)
    if (onClose) onClose()
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const res = await addAgendaEvent(formData)
    
    if (res?.error) {
      alert(res.error)
    }
    
    setLoading(false)
    close()
  }

  return (
    <>
      {children ? (
        <div onClick={() => setInternalIsOpen(true)} className="cursor-pointer inline-block">
          {children}
        </div>
      ) : isOpenProp === undefined ? (
        <button 
          onClick={() => setInternalIsOpen(true)}
          className="btn-neo btn-neo-dark px-5 py-2.5 text-[14px]"
        >
          + Novo Agendamento
        </button>
      ) : null}

      {isOpen && (
        <div className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[28px] p-8 w-full max-w-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 mb-6">Marcar na Agenda</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Título do Evento</label>
                <input required type="text" name="title" placeholder="Ex: Medição Cliente X" className="w-full border-0 bg-zinc-100 p-3.5 text-[15px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Categoria</label>
                  <select name="type" className="w-full border-0 bg-zinc-100 p-3.5 text-[14px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all">
                    <option value="REUNIAO">Reunião</option>
                    <option value="MEDICAO">Medição</option>
                    <option value="INSTALACAO">Instalação</option>
                    <option value="VISITA">Visita Técnica</option>
                    <option value="MANUTENCAO">Manutenção</option>
                    <option value="OUTRO">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Prioridade</label>
                  <select name="priority" defaultValue="MEDIA" className="w-full border-0 bg-zinc-100 p-3.5 text-[14px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all">
                    <option value="BAIXA">Baixa</option>
                    <option value="MEDIA">Média</option>
                    <option value="ALTA">Alta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Data</label>
                  <input required type="date" name="date" defaultValue={defaultDate} className="w-full border-0 bg-zinc-100 p-3.5 text-[14px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-500 mb-2">Horário (Opcional)</label>
                  <input type="time" name="time" className="w-full border-0 bg-zinc-100 p-3.5 text-[14px] font-medium text-zinc-900 rounded-xl outline-none focus:ring-2 focus:ring-zinc-900/10 focus:bg-white transition-all" />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={close}
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
