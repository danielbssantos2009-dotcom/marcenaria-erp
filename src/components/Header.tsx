'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell, Info } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="py-8 flex justify-between items-center bg-transparent print:hidden">
      
      {/* Saudação estilo Apple */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
          Bom dia, Marcos
        </h1>
        <p className="text-zinc-500 font-medium text-[15px] mt-1">Acompanhe suas tarefas, produções e fluxo de caixa.</p>
      </div>
      
      {/* Top Navigation Pill (estilo exato da referência) */}
      <div className="hidden lg:flex bg-white rounded-full p-1.5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] items-center">
        <Link href="/" className={`px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all ${pathname === '/' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}>Visão Geral</Link>
        <Link href="/projetos" className={`px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all ${pathname === '/projetos' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}>Atividades</Link>
        <Link href="/relatorios" className={`px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all ${pathname === '/relatorios' ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50'}`}>Relatórios</Link>
      </div>

      <div className="flex items-center gap-4">
        
        {/* Action Icons Independentes (Estilo Referência) */}
        <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-zinc-600 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] hover:scale-105 transition-all"><Search size={20} strokeWidth={2.5} /></button>
        <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-zinc-600 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] hover:scale-105 transition-all"><Bell size={20} strokeWidth={2.5} /></button>
        <button className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-zinc-600 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] hover:scale-105 transition-all"><Info size={20} strokeWidth={2.5} /></button>

        {/* Profile Dropdown Estilo Apple */}
        <div className="flex items-center gap-3 bg-white rounded-full pl-1.5 pr-4 py-1.5 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)] cursor-pointer hover:shadow-md transition-all ml-2">
          <div className="w-9 h-9 rounded-full bg-zinc-200 overflow-hidden">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcos" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[13px] font-semibold text-zinc-900 leading-tight">Marcos R.</span>
            <span className="text-[11px] font-medium text-zinc-500">marcos@novadesign.com</span>
          </div>
        </div>
      </div>
    </header>
  );
}
