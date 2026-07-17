export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function RelatoriosPage() {
  const projects = await prisma.project.findMany()
  const clients = await prisma.client.count()
  
  const totalBudget = projects.filter(p => p.status === 'ORCAMENTO').reduce((a, p) => a + p.value, 0)
  const totalApproved = projects.filter(p => p.status !== 'ORCAMENTO').reduce((a, p) => a + p.value, 0)
  const conversionRate = totalBudget + totalApproved > 0 ? (totalApproved / (totalBudget + totalApproved)) * 100 : 0

  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Relatórios Gerenciais</h1>
        <p className="text-sm text-zinc-500 mt-1">Acompanhe a saúde financeira e comercial do seu negócio.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card">
          <div className="text-xs-mono mb-4 text-zinc-500">RESUMO COMERCIAL</div>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <span className="text-sm font-medium text-zinc-600">Total de Clientes</span>
              <span className="font-bold text-lg text-zinc-800">{clients}</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <span className="text-sm font-medium text-zinc-600">Projetos Ativos</span>
              <span className="font-bold text-lg text-zinc-800">{projects.filter(p => p.status !== 'ORCAMENTO' && p.status !== 'CONCLUIDO').length}</span>
            </div>
            <div className="flex justify-between items-center border-b border-zinc-100 pb-2">
              <span className="text-sm font-medium text-zinc-600">Projetos Concluídos</span>
              <span className="font-bold text-lg text-green-600">{projects.filter(p => p.status === 'CONCLUIDO').length}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-sm font-bold text-zinc-800">Taxa de Conversão de Orçamentos</span>
              <span className="font-black text-xl text-[var(--color-brand-blue)]">{conversionRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="card bg-[var(--color-brand-dark)] text-white">
          <div className="text-xs-mono mb-4 text-zinc-400">PIPELINE DE VENDAS (R$)</div>
          <div className="space-y-6 mt-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-300">Orçamentos Abertos (Em negociação)</span>
                <span className="font-bold">R$ {totalBudget.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded overflow-hidden">
                <div className="h-full bg-zinc-500" style={{ width: \`\${(totalBudget / (totalBudget + totalApproved || 1)) * 100}%\`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-zinc-300">Valor em Produção (Aprovados)</span>
                <span className="font-bold text-green-400">R$ {totalApproved.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-zinc-800 rounded overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: \`\${(totalApproved / (totalBudget + totalApproved || 1)) * 100}%\`}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
