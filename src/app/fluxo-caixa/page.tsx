export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import { ArrowDownRight, ArrowUpRight, ArrowRightLeft, TrendingUp } from 'lucide-react'

const prisma = new PrismaClient()

export default async function FluxoCaixaPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'asc' }
  })
  
  let balanceAcumulado = 0;
  const fluxo = transactions.map(t => {
    const isReceita = t.type === 'IN';
    const valor = Math.abs(t.value);
    balanceAcumulado += isReceita ? valor : -valor;
    return { ...t, isReceita, valor, balanceAcumulado };
  });

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Fluxo de Caixa</h1>
        <p className="text-sm font-medium text-zinc-500 mt-1">Evolução e histórico de todo o dinheiro da marcenaria.</p>
      </div>

      <div className="bg-white/60 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden relative group">
        
        {/* Decoração de Fundo */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-110 transition-transform duration-700 text-blue-900 pointer-events-none">
          <TrendingUp size={120} />
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-black/5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                <th className="p-5 font-semibold">Data</th>
                <th className="p-5 font-semibold">Descrição</th>
                <th className="p-5 font-semibold text-right">Entrada</th>
                <th className="p-5 font-semibold text-right">Saída</th>
                <th className="p-5 font-semibold text-right text-blue-500">Saldo Acumulado</th>
              </tr>
            </thead>
            <tbody>
              {fluxo.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center font-medium text-zinc-400 text-sm">
                    Nenhuma movimentação registrada no fluxo de caixa.
                  </td>
                </tr>
              ) : (
                fluxo.map(t => (
                  <tr key={t.id} className="border-b border-black/5 last:border-0 hover:bg-white/40 transition-colors">
                    <td className="p-5 font-medium text-[14px] text-zinc-500">
                      {new Date(t.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </td>
                    <td className="p-5 font-bold text-[14px] text-zinc-900 flex items-center gap-2">
                      {t.isReceita ? (
                        <ArrowUpRight size={16} className="text-green-500" />
                      ) : (
                        <ArrowDownRight size={16} className="text-red-500" />
                      )}
                      {t.description}
                    </td>
                    <td className="p-5 text-right font-bold text-[14px] text-green-600">
                      {t.isReceita ? `+ R$ ${t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : <span className="text-zinc-300">-</span>}
                    </td>
                    <td className="p-5 text-right font-bold text-[14px] text-red-600">
                      {!t.isReceita ? `- R$ ${t.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : <span className="text-zinc-300">-</span>}
                    </td>
                    <td className="p-5 text-right">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[13px] font-bold tracking-wide ${
                        t.balanceAcumulado >= 0 
                          ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                          : 'bg-red-50 text-red-700 border border-red-100'
                      }`}>
                        {t.balanceAcumulado >= 0 ? <TrendingUp size={14} /> : <ArrowRightLeft size={14} />}
                        R$ {t.balanceAcumulado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
