export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'

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
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Fluxo de Caixa</h1>
        <p className="text-sm text-zinc-500 mt-1">Evolução do saldo ao longo do tempo.</p>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <th className="p-4">Data</th>
              <th className="p-4">Descrição</th>
              <th className="p-4 text-right">Entrada</th>
              <th className="p-4 text-right">Saída</th>
              <th className="p-4 text-right text-[var(--color-brand-blue)]">Saldo Acumulado</th>
            </tr>
          </thead>
          <tbody>
            {fluxo.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-500 text-sm">
                  Sem movimentações no fluxo de caixa.
                </td>
              </tr>
            ) : (
              fluxo.map(t => (
                <tr key={t.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                  <td className="p-4 font-medium text-sm text-zinc-500">{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4 font-bold text-sm text-[var(--color-brand-dark)]">{t.description}</td>
                  <td className="p-4 text-right font-bold text-sm text-green-600">
                    {t.isReceita ? `R$ ${t.valor.toFixed(2)}` : '-'}
                  </td>
                  <td className="p-4 text-right font-bold text-sm text-red-600">
                    {!t.isReceita ? `R$ ${t.valor.toFixed(2)}` : '-'}
                  </td>
                  <td className={`p-4 text-right font-bold text-sm ${t.balanceAcumulado >= 0 ? 'text-zinc-800' : 'text-red-600'}`}>
                    R$ {t.balanceAcumulado.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
