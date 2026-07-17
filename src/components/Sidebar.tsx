'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', path: '/', num: '01', group: 'Operação' },
    { name: 'Projetos', path: '/projetos', num: '02' },
    { name: 'Produção', path: '/producao', num: '03' },
    { name: 'Instalações', path: '/instalacoes', num: '04' },
    { name: 'Agenda', path: '/agenda', num: '05' },
    { name: 'Clientes', path: '/clientes', num: '06', group: 'Comercial' },
    { name: 'Orçamentos', path: '/orcamentos', num: '07' },
    { name: 'Financeiro', path: '/financeiro', num: '08', group: 'Financeiro' },
    { name: 'Fluxo de Caixa', path: '/fluxo-caixa', num: '09' },
    { name: 'Relatórios', path: '/relatorios', num: '10' },
  ];

  return (
    <aside className="w-[260px] bg-[var(--color-bg-sidebar)] text-[var(--color-text-sidebar)] flex flex-col shrink-0">
      <div className="p-6 flex items-center gap-3 border-b border-white/5">
        <div className="bg-[var(--color-brand-red)] text-white w-8 h-8 flex items-center justify-center font-bold text-sm">ND</div>
        <div>
          <div className="text-sm font-semibold text-white leading-tight">Nova Design</div>
          <div className="text-[10px] text-[var(--color-text-sidebar)] uppercase tracking-widest">Marcenaria &bull; ERP</div>
        </div>
      </div>

      <nav className="flex-1 mt-4">
        {navItems.map((item, idx) => (
          <div key={item.path}>
            {item.group && (
              <div className="pt-4 pb-2 pl-6 text-[10px] uppercase tracking-widest font-bold text-zinc-600">
                {item.group}
              </div>
            )}
            <Link 
              href={item.path} 
              className={`flex items-center py-2.5 px-6 text-[13px] font-medium transition-colors border-r-4 ${
                pathname === item.path 
                  ? 'bg-white/5 text-white border-[var(--color-brand-red)]' 
                  : 'border-transparent hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="font-mono text-[11px] mr-3 opacity-50">{item.num}</span>
              {item.name}
            </Link>
          </div>
        ))}
      </nav>

      <div className="p-6 text-[10px] text-[var(--color-text-sidebar)] font-mono tracking-widest">
        VERSÃO<br/>
        <strong className="text-white">2026.01 &bull; react</strong>
      </div>
    </aside>
  );
}
