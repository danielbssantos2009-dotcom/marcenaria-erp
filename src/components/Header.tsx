'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell, HelpCircle } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  
  const getTitle = () => {
    switch (pathname) {
      case '/': return 'Dashboard Principal';
      case '/projetos': return 'Gestão de Projetos';
      case '/producao': return 'Pipeline de Produção';
      case '/instalacoes': return 'Agenda de Instalações';
      case '/agenda': return 'Calendário';
      case '/clientes': return 'Carteira de Clientes';
      case '/orcamentos': return 'Novos Orçamentos';
      case '/financeiro': return 'Visão Financeira';
      case '/fluxo-caixa': return 'Fluxo de Caixa';
      case '/relatorios': return 'Análises e Relatórios';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="py-6 flex justify-between items-center bg-transparent mt-2">
      
      <div className="flex flex-col">
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-800 transition-all duration-300">
          {getTitle()}
        </h1>
        <p className="text-zinc-500 text-sm mt-1">Acompanhe suas tarefas, produções e status.</p>
      </div>
      
      {/* Top Navigation Pill (estilo referência) */}
      <div className="hidden lg:flex bg-white rounded-full p-1.5 shadow-sm border border-zinc-100">
        <button className="px-6 py-2 rounded-full bg-[var(--color-brand-dark)] text-white text-sm font-semibold transition-all shadow-md">Geral</button>
        <button className="px-6 py-2 rounded-full text-zinc-500 text-sm font-medium hover:bg-zinc-50 transition-all">Atividades</button>
        <button className="px-6 py-2 rounded-full text-zinc-500 text-sm font-medium hover:bg-zinc-50 transition-all">Relatórios</button>
      </div>

      <div className="flex items-center gap-6">
        
        {/* Action Icons */}
        <div className="flex items-center gap-2 bg-white rounded-full p-2 shadow-sm border border-zinc-100">
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-all hover:scale-105"><Search size={18} /></button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-all hover:scale-105"><Bell size={18} /></button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-all hover:scale-105"><HelpCircle size={18} /></button>
        </div>

        {/* Profile Pill */}
        <div className="flex items-center gap-3 bg-white rounded-full pl-2 pr-6 py-2 shadow-sm border border-zinc-100 cursor-pointer hover:shadow-md transition-all">
          <div className="w-10 h-10 rounded-full bg-zinc-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcos" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-zinc-800 leading-tight">Marcos R.</span>
            <span className="text-[11px] text-zinc-500">marcos@novadesign.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
