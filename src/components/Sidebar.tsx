'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Factory, Hammer, CalendarDays, Users, FileText, DollarSign, Activity, PieChart, Info, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Projetos', path: '/projetos', icon: <FolderKanban size={20} /> },
    { name: 'Produção', path: '/producao', icon: <Factory size={20} /> },
    { name: 'Instalações', path: '/instalacoes', icon: <Hammer size={20} /> },
    { name: 'Agenda', path: '/agenda', icon: <CalendarDays size={20} /> },
    { name: 'Clientes', path: '/clientes', icon: <Users size={20} /> },
    { name: 'Orçamentos', path: '/orcamentos', icon: <FileText size={20} /> },
    { name: 'Financeiro', path: '/financeiro', icon: <DollarSign size={20} /> },
    { name: 'Fluxo de Caixa', path: '/fluxo-caixa', icon: <Activity size={20} /> },
    { name: 'Relatórios', path: '/relatorios', icon: <PieChart size={20} /> },
  ];

  return (
    <aside className="w-20 my-6 ml-6 bg-white shadow-xl rounded-[2rem] flex flex-col items-center py-6 shrink-0 z-50">
      
      {/* Logotipo Simplificado */}
      <div className="w-10 h-10 bg-[var(--color-brand-primary)] text-white flex items-center justify-center font-bold text-sm rounded-xl shadow-lg mb-8">
        ND
      </div>

      <nav className="flex-1 flex flex-col gap-4 w-full px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path}
              href={item.path} 
              title={item.name}
              className={`flex items-center justify-center w-12 h-12 mx-auto rounded-full transition-all duration-300 hover:scale-110 ${
                isActive 
                  ? 'bg-[var(--color-brand-primary)] text-white shadow-md' 
                  : 'text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700'
              }`}
            >
              {item.icon}
            </Link>
          );
        })}
      </nav>

      {/* Ícones de Rodapé */}
      <div className="flex flex-col gap-4 mt-8">
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-all hover:scale-110">
          <Info size={20} />
        </button>
        <button className="w-12 h-12 rounded-full flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-all hover:scale-110">
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
}
