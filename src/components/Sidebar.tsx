'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Factory, Hammer, CalendarDays, Users, FileText, DollarSign, Activity, PieChart, Info, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={22} strokeWidth={2} /> },
    { name: 'Projetos', path: '/projetos', icon: <FolderKanban size={22} strokeWidth={2} /> },
    { name: 'Produção', path: '/producao', icon: <Factory size={22} strokeWidth={2} /> },
    { name: 'Instalações', path: '/instalacoes', icon: <Hammer size={22} strokeWidth={2} /> },
    { name: 'Agenda', path: '/agenda', icon: <CalendarDays size={22} strokeWidth={2} /> },
    { name: 'Clientes', path: '/clientes', icon: <Users size={22} strokeWidth={2} /> },
    { name: 'Orçamentos', path: '/orcamentos', icon: <FileText size={22} strokeWidth={2} /> },
    { name: 'Financeiro', path: '/financeiro', icon: <DollarSign size={22} strokeWidth={2} /> },
    { name: 'Fluxo de Caixa', path: '/fluxo-caixa', icon: <Activity size={22} strokeWidth={2} /> },
    { name: 'Relatórios', path: '/relatorios', icon: <PieChart size={22} strokeWidth={2} /> },
  ];

  return (
    <aside className="w-[84px] my-6 ml-6 bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] rounded-[2rem] flex flex-col items-center py-8 shrink-0 z-50 print:hidden">
      
      {/* Logotipo Redondo e Sutil */}
      <div className="w-11 h-11 bg-zinc-900 text-white flex items-center justify-center font-bold text-sm rounded-2xl mb-8 shadow-md">
        ND
      </div>

      <nav className="flex-1 flex flex-col gap-3 w-full px-3 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path}
              href={item.path} 
              title={item.name}
              className={`flex items-center justify-center w-12 h-12 mx-auto rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-zinc-900 text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] scale-105' 
                  : 'text-zinc-400 hover:bg-zinc-50 hover:text-zinc-800'
              }`}
            >
              {item.icon}
            </Link>
          );
        })}
      </nav>

      {/* Ícones de Rodapé */}
      <div className="flex flex-col gap-3 mt-8 px-3">
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:text-zinc-800 transition-all">
          <Info size={22} strokeWidth={2} />
        </button>
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-50 hover:text-zinc-800 transition-all">
          <LogOut size={22} strokeWidth={2} />
        </button>
      </div>
    </aside>
  );
}
