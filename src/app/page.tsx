export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import RevenueChart from '@/components/RevenueChart'
import NewTransactionDialog from '@/components/NewTransactionDialog'
import { Wallet, Briefcase, TrendingUp, BarChart2, PieChart } from 'lucide-react'

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

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      
      {/* Top KPIs - Estilo Neo Apple */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Total Balance / Ativos */}
        <div className="col-span-12 lg:col-span-5 neo-card flex flex-col justify-between h-[300px]">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-zinc-500 font-medium text-[15px]">Projetos Ativos</span>
              <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-[12px] font-semibold flex items-center gap-1">
                <Briefcase size={14} /> Hoje
              </span>
            </div>
            <div className="text-[64px] leading-none font-bold text-zinc-900 tracking-tight mb-3">
              {projects.length}
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">↑ 12%</span> 
              <span className="text-sm font-medium text-zinc-400">em relação ao mês passado</span>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button className="flex-1 btn-neo btn-neo-dark py-3.5 text-[15px]">
              Ver Projetos
            </button>
            <button className="flex-1 btn-neo btn-neo-light py-3.5 text-[15px]">
              Novo Projeto
            </button>
          </div>
        </div>

        {/* 4 Mini Cards (Earnings, Spending, Income, Revenue) */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-6 h-[300px]">
          
          <div className="neo-card neo-card-gradient flex flex-col justify-between relative overflow-hidden group cursor-pointer">
            <div className="flex justify-between items-start z-10">
              <span className="text-xs-mono text-white/80">RECEITA TOTAL</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm"><Wallet size={16} color="white" /></div>
            </div>
            <div className="z-10">
              <div className="text-[40px] leading-none font-bold tracking-tight mb-2">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <span className="text-[13px] font-medium text-white/90">↑ 7% este mês</span>
            </div>
          </div>
          
          <div className="neo-card flex flex-col justify-between cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="text-xs-mono text-zinc-500">DESPESAS (EST.)</span>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center"><TrendingUp size={16} className="text-zinc-400" /></div>
            </div>
            <div>
              <div className="text-[40px] leading-none font-bold text-zinc-900 tracking-tight mb-2">R$ 0,00</div>
              <span className="text-[13px] font-medium text-red-500">↓ 5% este mês</span>
            </div>
          </div>
          
          <div className="neo-card flex flex-col justify-between cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="text-xs-mono text-zinc-500">LUCRO LÍQUIDO</span>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center"><BarChart2 size={16} className="text-zinc-400" /></div>
            </div>
            <div>
              <div className="text-[40px] leading-none font-bold text-zinc-900 tracking-tight mb-2">R$ {totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
              <span className="text-[13px] font-medium text-green-500">↑ 8% este mês</span>
            </div>
          </div>

          <div className="neo-card flex flex-col justify-between cursor-pointer">
            <div className="flex justify-between items-start">
              <span className="text-xs-mono text-zinc-500">TAXA DE CONVERSÃO</span>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center"><PieChart size={16} className="text-zinc-400" /></div>
            </div>
            <div>
              <div className="text-[40px] leading-none font-bold text-zinc-900 tracking-tight mb-2">100%</div>
              <span className="text-[13px] font-medium text-green-500">↑ 4% este mês</span>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="neo-card">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
               <span className="text-[14px] font-bold text-zinc-800">Receita &bull; Últimos Meses</span>
            </div>
            <div className="h-[250px] w-full">
              <RevenueChart data={chartData} />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5">
           <div className="neo-card h-full">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
              <span className="text-[14px] font-bold text-zinc-800">Transações Recentes</span>
              <NewTransactionDialog />
            </div>
            <div className="space-y-1">
              {recentTransactions.map(t => (
                <div key={t.id} className="flex justify-between items-center py-3 hover:bg-zinc-50 px-2 rounded-xl transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                     <div className={`w-2 h-2 rounded-full ${t.type === 'IN' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                     <span className="text-[14px] font-medium text-zinc-700">{t.description}</span>
                  </div>
                  <div className={`font-semibold text-[15px] ${t.type === 'IN' ? 'text-zinc-900' : 'text-zinc-900'}`}>
                    {t.type === 'IN' ? '+' : '-'} R$ {Math.abs(t.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
              {recentTransactions.length === 0 && (
                <div className="text-center text-zinc-400 py-4 text-sm">Nenhuma transação recente.</div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
