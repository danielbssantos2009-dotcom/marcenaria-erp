export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import RevenueChart from '@/components/RevenueChart'
import NewTransactionDialog from '@/components/NewTransactionDialog'
import { Wallet, Briefcase, TrendingUp, BarChart2, PieChart } from 'lucide-react'

const prisma = new PrismaClient()

function calcDiff(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

function DiffBadge({ diff, inverse = false }: { diff: number, inverse?: boolean }) {
  if (diff === 0) return <span className="text-[13px] font-medium text-zinc-400">&bull; 0% este mês</span>;
  
  const isPositive = diff > 0;
  const isGood = inverse ? !isPositive : isPositive;
  
  return (
    <span className={`text-[13px] font-medium ${isGood ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? '↑' : '↓'} {Math.abs(diff).toFixed(1)}% este mês
    </span>
  );
}

export default async function DashboardPage() {
  const allProjects = await prisma.project.findMany({ include: { client: true }, orderBy: { createdAt: 'desc' } });
  const activeProjects = allProjects.filter(p => p.status !== 'ORCAMENTO');
  
  const recentTransactions = await prisma.transaction.findMany({ take: 5, orderBy: { date: 'desc' } });
  const allTransactions = await prisma.transaction.findMany();
  
  const now = new Date();
  const firstDayThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  // Projetos KPI
  const projectsThisMonth = activeProjects.filter(p => new Date(p.createdAt) >= firstDayThisMonth).length;

  // Financeiro KPI
  const transThisMonth = allTransactions.filter(t => new Date(t.date) >= firstDayThisMonth);
  const transLastMonth = allTransactions.filter(t => new Date(t.date) >= firstDayLastMonth && new Date(t.date) < firstDayThisMonth);

  const revThisMonth = transThisMonth.filter(t => t.type === 'IN').reduce((sum, t) => sum + t.value, 0);
  const revLastMonth = transLastMonth.filter(t => t.type === 'IN').reduce((sum, t) => sum + t.value, 0);
  const revDiff = calcDiff(revThisMonth, revLastMonth);

  const expThisMonth = transThisMonth.filter(t => t.type === 'OUT').reduce((sum, t) => sum + Math.abs(t.value), 0);
  const expLastMonth = transLastMonth.filter(t => t.type === 'OUT').reduce((sum, t) => sum + Math.abs(t.value), 0);
  const expDiff = calcDiff(expThisMonth, expLastMonth);

  const profitThisMonth = revThisMonth - expThisMonth;
  const profitLastMonth = revLastMonth - expLastMonth;
  const profitDiff = calcDiff(profitThisMonth, profitLastMonth);

  // Conversão KPI
  const projThisMonthAll = allProjects.filter(p => new Date(p.createdAt) >= firstDayThisMonth);
  const projLastMonthAll = allProjects.filter(p => new Date(p.createdAt) >= firstDayLastMonth && new Date(p.createdAt) < firstDayThisMonth);
  
  const convThisMonth = projThisMonthAll.length > 0 ? (projThisMonthAll.filter(p => p.status !== 'ORCAMENTO').length / projThisMonthAll.length) * 100 : 0;
  const convLastMonth = projLastMonthAll.length > 0 ? (projLastMonthAll.filter(p => p.status !== 'ORCAMENTO').length / projLastMonthAll.length) * 100 : 0;
  const convDiff = calcDiff(convThisMonth, convLastMonth);

  // Chart
  const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const chartDataMap = new Map<string, number>();
  
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
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5 neo-card flex flex-col justify-between min-w-0 overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-zinc-500 font-medium text-[15px] truncate">Projetos Ativos</span>
              <span className="bg-zinc-100 text-zinc-600 px-3 py-1 rounded-full text-[12px] font-semibold flex items-center gap-1 shrink-0">
                <Briefcase size={14} /> Hoje
              </span>
            </div>
            <div className="text-[56px] lg:text-[64px] leading-none font-bold text-zinc-900 tracking-tight mb-3 truncate">
              {activeProjects.length}
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold shrink-0">+{projectsThisMonth}</span> 
              <span className="text-sm font-medium text-zinc-400 truncate">novos projetos este mês</span>
            </div>
          </div>
          <div className="flex gap-4 mt-8">
            <button className="flex-1 btn-neo btn-neo-dark py-3.5 text-[14px] sm:text-[15px] truncate">
              Ver Projetos
            </button>
            <button className="flex-1 btn-neo btn-neo-light py-3.5 text-[14px] sm:text-[15px] truncate">
              Novo Projeto
            </button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-0">
          
          <div className="neo-card neo-card-gradient flex flex-col justify-between relative overflow-hidden group cursor-pointer min-w-0">
            <div className="flex justify-between items-start z-10 mb-4">
              <span className="text-xs-mono text-white/80 truncate">RECEITA (MÊS)</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0"><Wallet size={16} color="white" /></div>
            </div>
            <div className="z-10 min-w-0">
              <div className="text-[28px] lg:text-[32px] xl:text-[36px] leading-none font-bold tracking-tight mb-2 truncate">
                R$ {revThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              {revDiff === 0 ? (
                <span className="text-[13px] font-medium text-white/70 block truncate">&bull; 0% este mês</span>
              ) : (
                <span className="text-[13px] font-medium text-white/90 block truncate">
                  {revDiff > 0 ? '↑' : '↓'} {Math.abs(revDiff).toFixed(1)}% este mês
                </span>
              )}
            </div>
          </div>
          
          <div className="neo-card flex flex-col justify-between cursor-pointer min-w-0 overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs-mono text-zinc-500 truncate">DESPESAS (MÊS)</span>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0"><TrendingUp size={16} className="text-zinc-400" /></div>
            </div>
            <div className="min-w-0">
              <div className="text-[28px] lg:text-[32px] xl:text-[36px] leading-none font-bold text-zinc-900 tracking-tight mb-2 truncate">
                R$ {expThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="truncate"><DiffBadge diff={expDiff} inverse /></div>
            </div>
          </div>
          
          <div className="neo-card flex flex-col justify-between cursor-pointer min-w-0 overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs-mono text-zinc-500 truncate">LUCRO (MÊS)</span>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0"><BarChart2 size={16} className="text-zinc-400" /></div>
            </div>
            <div className="min-w-0">
              <div className="text-[28px] lg:text-[32px] xl:text-[36px] leading-none font-bold text-zinc-900 tracking-tight mb-2 truncate">
                R$ {profitThisMonth.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="truncate"><DiffBadge diff={profitDiff} /></div>
            </div>
          </div>

          <div className="neo-card flex flex-col justify-between cursor-pointer min-w-0 overflow-hidden">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs-mono text-zinc-500 truncate">CONVERSÃO (MÊS)</span>
              <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center shrink-0"><PieChart size={16} className="text-zinc-400" /></div>
            </div>
            <div className="min-w-0">
              <div className="text-[28px] lg:text-[32px] xl:text-[36px] leading-none font-bold text-zinc-900 tracking-tight mb-2 truncate">
                {convThisMonth.toFixed(0)}%
              </div>
              <div className="truncate"><DiffBadge diff={convDiff} /></div>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-7 min-w-0 space-y-6">
          <div className="neo-card flex flex-col h-full overflow-hidden">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4 shrink-0">
               <span className="text-[14px] font-bold text-zinc-800 truncate">Receita &bull; Últimos Meses</span>
            </div>
            <div className="h-[250px] w-full min-w-0 flex-1">
              <RevenueChart data={chartData} />
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 min-w-0">
           <div className="neo-card h-full overflow-hidden flex flex-col">
            <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4 shrink-0 gap-4">
              <span className="text-[14px] font-bold text-zinc-800 truncate">Transações Recentes</span>
              <div className="shrink-0">
                <NewTransactionDialog />
              </div>
            </div>
            <div className="space-y-1 overflow-y-auto flex-1">
              {recentTransactions.map(t => (
                <div key={t.id} className="flex justify-between items-center py-3 hover:bg-zinc-50 px-2 rounded-xl transition-all cursor-pointer">
                  <div className="flex items-center gap-3 min-w-0">
                     <div className={`w-2 h-2 rounded-full shrink-0 ${t.type === 'IN' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                     <span className="text-[14px] font-medium text-zinc-700 truncate">{t.description}</span>
                  </div>
                  <div className={`font-semibold text-[15px] whitespace-nowrap ml-4 shrink-0 ${t.type === 'IN' ? 'text-zinc-900' : 'text-zinc-900'}`}>
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
