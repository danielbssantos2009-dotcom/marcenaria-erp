'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  const getTitle = () => {
    switch (pathname) {
      case '/': return 'Dashboard';
      case '/projetos': return 'Projetos';
      case '/producao': return 'Pipeline de Produção';
      case '/instalacoes': return 'Controle de Instalações';
      case '/agenda': return 'Agenda Completa';
      case '/clientes': return 'Gestão de Clientes';
      case '/orcamentos': return 'Orçamentos';
      case '/financeiro': return 'Visão Financeira';
      case '/fluxo-caixa': return 'Fluxo de Caixa';
      case '/relatorios': return 'Central de Relatórios';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="bg-[var(--color-bg-card)] px-10 py-6 flex justify-between items-end border-b border-[var(--color-border-light)]">
      <div>
        <span className="font-mono text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider mb-1 block">
          01 &nbsp; MARCENARIA NOVA DESIGN
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight leading-none text-[var(--color-text-main)]">
          {getTitle()}
        </h1>
      </div>
      
      <div className="flex gap-10 items-center">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1 font-semibold">Data</span>
          <span className="font-mono text-[12px] font-bold">17 DE JUL. DE 2026</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] mb-1 font-semibold">Turno</span>
          <span className="font-mono text-[12px] font-bold">08:00 — 18:00</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[var(--color-brand-dark)] text-white flex items-center justify-center font-bold text-xs">MR</div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold">Marcos R.</span>
            <span className="text-[10px] uppercase text-[var(--color-text-muted)] tracking-wider">Administrador</span>
          </div>
        </div>
      </div>
    </header>
  );
}
