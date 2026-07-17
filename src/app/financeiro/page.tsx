export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import NewTransactionDialog from '@/components/NewTransactionDialog'

const prisma = new PrismaClient()

export default async function FinanceiroPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  })
  
  const totalIn = transactions.filter(t => t.type === 'IN').reduce((acc, t) => acc + t.value, 0)
  const totalOut = transactions.filter(t => t.type === 'OUT').reduce((acc, t) => acc + Math.abs(t.value), 0)
  const balance = totalIn - totalOut

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Financeiro</h1>
          <p className="text-sm text-zinc-500 mt-1">Gestão de contas a pagar e receber da marcenaria.</p>
        </div>
        <NewTransactionDialog />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="card border-l-4 border-l-green-500">
          <div className="text-xs-mono mb-2">Total Receitas</div>
          <div className="text-2xl font-extrabold text-green-600">R$ {totalIn.toFixed(2)}</div>
        </div>
        <div className="card border-l-4 border-l-red-500">
          <div className="text-xs-mono mb-2">Total Despesas</div>
          <div className="text-2xl font-extrabold text-red-600">R$ {totalOut.toFixed(2)}</div>
        </div>
        <div className={`card border-l-4 ${balance >= 0 ? 'border-l-blue-500' : 'border-l-orange-500'}`}>
          <div className="text-xs-mono mb-2">Saldo Geral</div>
          <div className="text-2xl font-extrabold text-zinc-800">R$ {balance.toFixed(2)}</div>
        </div>
      </div>

      <div className="card p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <th className="p-4">Descrição</th>
              <th className="p-4">Data</th>
              <th className="p-4">Tipo</th>
              <th className="p-4 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-zinc-500 text-sm">
                  Nenhuma transação encontrada.
                </td>
              </tr>
            ) : (
              transactions.map(t => (
                <tr key={t.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50 transition-colors">
                  <td className="p-4 font-bold text-sm text-[var(--color-brand-dark)]">{t.description}</td>
                  <td className="p-4 font-medium text-sm text-zinc-500">{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${t.type === 'IN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {t.type === 'IN' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td className={`p-4 text-right font-bold text-sm ${t.type === 'IN' ? 'text-green-600' : 'text-red-600'}`}>
                    {t.type === 'IN' ? '+' : '-'} R$ {Math.abs(t.value).toFixed(2)}
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
