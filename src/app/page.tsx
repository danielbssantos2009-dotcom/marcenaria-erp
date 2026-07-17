export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import RevenueChart from '@/components/RevenueChart'
import NewTransactionDialog from '@/components/NewTransactionDialog'

const prisma = new PrismaClient()

// Server Component
export default async function DashboardPage() {
  const projects = await prisma.project.findMany({ include: { client: true }, take: 5, orderBy: { createdAt: 'desc' }, where: { status: { not: 'ORCAMENTO' } } });
  
  // Pegando transações para a lista recente
  const recentTransactions = await prisma.transaction.findMany({ take: 5, orderBy: { date: 'desc' } });
  
  // Calculando Receita Total e Gráfico com base em todas as transações
  const allTransactions = await prisma.transaction.findMany();
  
  const totalRevenue = allTransactions
    .filter(t => t.type === 'IN')
    .reduce((sum, t) => sum + t.value, 0);

  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const chartDataMap = new Map<string, number>();
  
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    chartDataMap.set(months[d.getMonth()], 0);
  }

  allTransactions.forEach(t => {
    if (t.type === 'IN') {
      const monthName = months[new Date(t.date).getMonth()];
      if (chartDataMap.has(monthName)) {
        chartDataMap.set(monthName, chartDataMap.get(monthName)! + t.value);
      }
    }
  });

  const chartData = Array.from(chartDataMap.entries()).map(([name, val]) => ({ name, val }));

    <div className="space-y-6 animate-in fade-in zoom-in duration-500">
      
      {/* Top KPIs - Estilo Referência */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Total Balance / Ativos */}
        <div className="col-span-5 card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-zinc-500 font-semibold text-sm">Projetos Ativos</span>
              <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-xs font-bold">Hoje</span>
            </div>
            <div className="text-5xl font-extrabold text-zinc-800 mb-2">{projects.length}</div>
            <div className="text-sm font-medium text-green-600 flex items-center gap-1">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs">↑ 12%</span> em relação ao mês passado
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button className="flex-1 bg-zinc-900 text-white rounded-full py-3 font-semibold text-sm hover:bg-zinc-800 transition-all hover:scale-105 shadow-md">
              Ver Projetos
            </button>
            <button className="flex-1 bg-white border border-zinc-200 text-zinc-800 rounded-full py-3 font-semibold text-sm hover:bg-zinc-50 transition-all hover:scale-105 shadow-sm">
              Novo Projeto
            </button>
          </div>
        </div>

        {/* 4 Mini Cards (Earnings, Spending, Income, Revenue) */}
        <div className="col-span-7 grid grid-cols-2 gap-6">
          
          <div className="card card-gradient flex flex-col justify-center">
            <span className="text-xs-mono mb-2 text-white/80">Receita Total</span>
            <div className="text-3xl font-extrabold mb-1">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <span className="text-xs font-medium text-white/90">↑ 7% este mês</span>
          </div>
          
          <div className="card flex flex-col justify-center bg-white">
            <span className="text-xs-mono mb-2">Despesas (Est.)</span>
            <div className="text-3xl font-extrabold mb-1 text-zinc-800">R$ 0,00</div>
            <span className="text-xs font-medium text-red-500">↓ 5% este mês</span>
          </div>
          
          <div className="card flex flex-col justify-center bg-white">
            <span className="text-xs-mono mb-2">Lucro Líquido</span>
            <div className="text-3xl font-extrabold mb-1 text-zinc-800">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
            <span className="text-xs font-medium text-green-500">↑ 8% este mês</span>
          </div>

          <div className="card flex flex-col justify-center bg-white">
            <span className="text-xs-mono mb-2">Taxa de Conversão</span>
            <div className="text-3xl font-extrabold mb-1 text-zinc-800">100%</div>
            <span className="text-xs font-medium text-green-500">↑ 4% este mês</span>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 space-y-6">
          <div className="card">
            <span className="text-xs-mono mb-2 block">RECEITA • ÚLTIMOS MESES</span>
            <div className="h-[250px] w-full mt-4 bg-zinc-50 rounded p-4">
              <RevenueChart data={chartData} />
            </div>
          </div>
        </div>

        <div className="col-span-4">
           <div className="card h-full">
            <div className="flex justify-between items-center mb-4 border-b border-zinc-100 pb-2">
              <span className="text-xs-mono">TRANSAÇÕES RECENTES</span>
              <NewTransactionDialog />
            </div>
            <div className="space-y-4">
              {recentTransactions.map(t => (
                <div key={t.id} className="flex justify-between items-center pb-3 border-b border-[var(--color-border-light)] last:border-0">
                  <div>
                    <div className="text-sm font-semibold">{t.description}</div>
                  </div>
                  <div className={`font-mono font-bold ${t.type === 'IN' ? 'text-[var(--color-brand-green)]' : 'text-[var(--color-brand-red)]'}`}>
                    {t.type === 'IN' ? '+' : '-'} R$ {Math.abs(t.value).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
