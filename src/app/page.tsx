import { PrismaClient } from '@prisma/client'
import RevenueChart from '@/components/RevenueChart'
import NewTransactionDialog from '@/components/NewTransactionDialog'

const prisma = new PrismaClient()

// Server Component
export default async function DashboardPage() {
  const projects = await prisma.project.findMany({ include: { client: true }, take: 5, orderBy: { createdAt: 'desc' } });
  const transactions = await prisma.transaction.findMany({ take: 5, orderBy: { date: 'desc' } });
  
  const chartData = [
    { name: 'JAN', val: 120 }, { name: 'FEV', val: 150 }, { name: 'MAR', val: 180 },
    { name: 'ABR', val: 140 }, { name: 'MAI', val: 200 }, { name: 'JUN', val: 250 },
    { name: 'JUL', val: 384 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top KPIs */}
      <div className="grid grid-cols-4 gap-6">
        <div className="card border-l-4 border-l-[var(--color-brand-red)]">
          <div className="text-xs-mono mb-2">Projetos Ativos</div>
          <div className="text-3xl font-extrabold mb-1">{projects.length}</div>
          <div className="text-xs text-[var(--color-text-muted)] font-medium">Extraídos do Banco</div>
        </div>
        <div className="card border-l-4 border-l-[var(--color-brand-green)]">
          <div className="text-xs-mono mb-2">Receita • Mês</div>
          <div className="text-3xl font-extrabold mb-1 flex items-baseline gap-2">
            <span className="text-lg text-zinc-400 font-semibold">R$</span> 384.2K
          </div>
          <div className="text-xs text-[var(--color-text-muted)] font-medium">Meta R$ 420K</div>
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
              {transactions.map(t => (
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
