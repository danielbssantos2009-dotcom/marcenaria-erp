export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import NewTransactionDialog from '@/components/NewTransactionDialog'
import DeleteTransactionButton from '@/components/DeleteTransactionButton'
import { ArrowDownRight, ArrowUpRight, Wallet, TrendingUp, TrendingDown } from 'lucide-react'

const prisma = new PrismaClient()

export default async function FinanceiroPage() {
  const transactions = await prisma.transaction.findMany({
    orderBy: { date: 'desc' }
  })
  
  const totalIn = transactions.filter(t => t.type === 'IN').reduce((acc, t) => acc + t.value, 0)
  const totalOut = transactions.filter(t => t.type === 'OUT').reduce((acc, t) => acc + Math.abs(t.value), 0)
  const balance = totalIn - totalOut

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Financeiro</h1>
          <p className="text-sm font-medium text-zinc-500 mt-1">Gestão de contas a pagar e receber da marcenaria.</p>
        </div>
        <NewTransactionDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 text-green-500">
            <TrendingUp size={64} />
          </div>
          <div className="flex items-center gap-3 text-zinc-500 font-bold text-sm tracking-wider uppercase mb-3">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <ArrowUpRight size={18} />
            </div>
            Total Receitas
          </div>
          <div className="text-3xl font-extrabold text-zinc-900">
            R$ {totalIn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 text-red-500">
            <TrendingDown size={64} />
          </div>
          <div className="flex items-center gap-3 text-zinc-500 font-bold text-sm tracking-wider uppercase mb-3">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ArrowDownRight size={18} />
            </div>
            Total Despesas
          </div>
          <div className="text-3xl font-extrabold text-zinc-900">
            R$ {totalOut.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-6 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500 text-blue-500">
            <Wallet size={64} />
          </div>
          <div className="flex items-center gap-3 text-zinc-500 font-bold text-sm tracking-wider uppercase mb-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${balance >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
              <Wallet size={18} />
            </div>
            Saldo Geral
          </div>
          <div className="text-3xl font-extrabold text-zinc-900">
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-2xl rounded-[32px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-black/5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                <th className="p-5 font-semibold">Descrição</th>
                <th className="p-5 font-semibold">Data</th>
                <th className="p-5 font-semibold">Tipo</th>
                <th className="p-5 font-semibold text-right">Valor</th>
                <th className="p-5 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center font-medium text-zinc-400 text-sm">
                    Nenhuma movimentação financeira encontrada.
                  </td>
                </tr>
              ) : (
                transactions.map(t => (
                  <tr key={t.id} className="border-b border-black/5 last:border-0 hover:bg-white/40 transition-colors">
                    <td className="p-5 font-bold text-[14px] text-zinc-900">{t.description}</td>
                    <td className="p-5 font-medium text-[14px] text-zinc-500">
                      {new Date(t.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </td>
                    <td className="p-5">
                      <span className={`flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider ${
                        t.type === 'IN' ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'
                      }`}>
                        {t.type === 'IN' ? <ArrowUpRight size={14}/> : <ArrowDownRight size={14}/>}
                        {t.type === 'IN' ? 'Receita' : 'Despesa'}
                      </span>
                    </td>
                    <td className={`p-5 text-right font-bold text-[15px] ${t.type === 'IN' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === 'IN' ? '+' : '-'} R$ {Math.abs(t.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="p-5 text-right">
                      <DeleteTransactionButton id={t.id} />
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
