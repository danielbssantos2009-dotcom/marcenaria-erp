export const dynamic = 'force-dynamic'

import { PrismaClient } from '@prisma/client'
import ExportReportButtons from '@/components/ExportReportButtons'
import { Sparkles, TrendingUp, AlertTriangle, Info, CheckCircle2 } from 'lucide-react'

const prisma = new PrismaClient()

export default async function RelatoriosPage() {
  const projects = await prisma.project.findMany()
  const clients = await prisma.client.count()
  const transactions = await prisma.transaction.findMany()
  
  // Totais Comerciais
  const totalBudget = projects.filter(p => p.status === 'ORCAMENTO').reduce((a, p) => a + p.value, 0)
  const totalApproved = projects.filter(p => p.status !== 'ORCAMENTO').reduce((a, p) => a + p.value, 0)
  const conversionRate = totalBudget + totalApproved > 0 ? (totalApproved / (totalBudget + totalApproved)) * 100 : 0
  
  // Totais Financeiros
  const totalIn = transactions.filter(t => t.type === 'IN').reduce((acc, t) => acc + t.value, 0)
  const totalOut = transactions.filter(t => t.type === 'OUT').reduce((acc, t) => acc + t.value, 0)
  const activeProjects = projects.filter(p => p.status !== 'ORCAMENTO' && p.status !== 'CONCLUIDO').length

  // Motor de Insights (Regras de Negócio)
  const insights = []
  
  if (totalOut > totalIn && totalOut > 0) {
    insights.push({
      type: 'danger',
      icon: <AlertTriangle size={18} className="text-red-500" />,
      title: 'Déficit Financeiro',
      text: 'Suas despesas superam as receitas registradas. Revise sua precificação atual ou identifique custos desnecessários na produção para fechar a conta no azul.'
    })
  } else if (totalIn > totalOut * 1.5 && totalOut > 0) {
    insights.push({
      type: 'success',
      icon: <TrendingUp size={18} className="text-green-500" />,
      title: 'Margem Saudável',
      text: 'Excelente! Sua relação de entradas vs saídas está muito positiva. Você está operando com uma boa margem de lucro em caixa.'
    })
  }

  if (conversionRate < 25 && (totalBudget > 0 || totalApproved > 0)) {
    insights.push({
      type: 'warning',
      icon: <Info size={18} className="text-amber-500" />,
      title: 'Conversão Comercial Baixa',
      text: `Sua taxa de conversão está em apenas ${conversionRate.toFixed(1)}%. Sugestão: Faça um follow-up (retorno pelo WhatsApp) com os clientes que estão com orçamentos abertos na aba de Orçamentos.`
    })
  } else if (conversionRate >= 50) {
    insights.push({
      type: 'success',
      icon: <CheckCircle2 size={18} className="text-green-500" />,
      title: 'Excelente Vendedor',
      text: 'Sua taxa de aprovação está altíssima (acima de 50%). Seus clientes enxergam muito valor no seu trabalho. Continue assim!'
    })
  }

  if (activeProjects > 8) {
    insights.push({
      type: 'warning',
      icon: <AlertTriangle size={18} className="text-amber-500" />,
      title: 'Alerta de Gargalo',
      text: `Você tem ${activeProjects} projetos ativos simultaneamente. Fique atento à capacidade do chão de fábrica para não atrasar as datas limite das entregas.`
    })
  }

  const exportData = {
    clients,
    projectsActive: activeProjects,
    projectsCompleted: projects.filter(p => p.status === 'CONCLUIDO').length,
    conversionRate,
    totalBudget,
    totalApproved,
    totalIn,
    totalOut
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-300">
      
      {/* Header e Ações (Oculto na Impressão) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">Inteligência & Relatórios</h1>
          <p className="text-sm font-medium text-zinc-500 mt-1">Acompanhe a saúde financeira e comercial do seu negócio.</p>
        </div>
        <ExportReportButtons data={exportData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card Resumo Comercial */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] relative overflow-hidden group">
          <div className="text-[11px] font-bold tracking-widest text-zinc-400 mb-6 flex items-center gap-2 uppercase">
            <TrendingUp size={14} />
            Resumo Comercial
          </div>
          <div className="space-y-5">
            <div className="flex justify-between items-end border-b border-black/5 pb-3">
              <span className="text-sm font-semibold text-zinc-500">Total de Clientes</span>
              <span className="font-black text-2xl text-zinc-800 leading-none">{clients}</span>
            </div>
            <div className="flex justify-between items-end border-b border-black/5 pb-3">
              <span className="text-sm font-semibold text-zinc-500">Projetos Ativos</span>
              <span className="font-black text-2xl text-zinc-800 leading-none">{activeProjects}</span>
            </div>
            <div className="flex justify-between items-end border-b border-black/5 pb-3">
              <span className="text-sm font-semibold text-zinc-500">Projetos Concluídos</span>
              <span className="font-black text-2xl text-green-600 leading-none">{projects.filter(p => p.status === 'CONCLUIDO').length}</span>
            </div>
            <div className="flex justify-between items-end pt-3">
              <span className="text-[13px] font-bold text-zinc-800 uppercase tracking-wide">Taxa de Conversão Real</span>
              <span className="font-black text-3xl text-blue-600 leading-none">{conversionRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Card Pipeline (Dark Mode) */}
        <div className="bg-zinc-950/90 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-8 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.3)] text-white relative overflow-hidden">
          {/* Elemento de background decorativo */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-zinc-800 rounded-full blur-3xl opacity-20 pointer-events-none"></div>

          <div className="text-[11px] font-bold tracking-widest text-zinc-400 mb-6 flex items-center gap-2 uppercase relative z-10">
            Pipeline de Vendas (R$)
          </div>
          <div className="space-y-8 relative z-10">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-zinc-400">Orçamentos Abertos (Em negociação)</span>
                <span className="font-bold text-lg">R$ {totalBudget.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="h-3 bg-zinc-900 rounded-full overflow-hidden shadow-inner border border-zinc-800">
                <div className="h-full bg-zinc-500 shadow-[0_0_10px_rgba(113,113,122,0.5)] transition-all duration-1000" style={{ width: `${(totalBudget / (totalBudget + totalApproved || 1)) * 100}%`}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium text-zinc-400">Valor em Produção (Aprovados)</span>
                <span className="font-bold text-lg text-green-400">R$ {totalApproved.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="h-3 bg-zinc-900 rounded-full overflow-hidden shadow-inner border border-zinc-800">
                <div className="h-full bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)] transition-all duration-1000" style={{ width: `${(totalApproved / (totalBudget + totalApproved || 1)) * 100}%`}}></div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Dicas / Insights da IA - (Oculto na impressão para ficar só o relatório bruto, se desejar. Mas vamos manter pra impressão tbm pq é útil) */}
      <div className="mt-8">
        <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-4 flex items-center gap-2">
          <Sparkles size={16} className="text-blue-500" />
          Insights & Recomendações
        </h2>
        
        {insights.length === 0 ? (
          <div className="bg-white/40 border border-white/60 rounded-2xl p-6 text-sm font-medium text-zinc-500 text-center">
            Sem insights no momento. Registre mais movimentações para gerar inteligência.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {insights.map((insight, idx) => (
              <div key={idx} className={`rounded-2xl p-5 flex items-start gap-4 border shadow-sm backdrop-blur-md ${
                insight.type === 'danger' ? 'bg-red-50/50 border-red-100/80 text-red-900' :
                insight.type === 'warning' ? 'bg-amber-50/50 border-amber-100/80 text-amber-900' :
                'bg-green-50/50 border-green-100/80 text-green-900'
              }`}>
                <div className={`mt-0.5 p-2 rounded-xl shrink-0 ${
                  insight.type === 'danger' ? 'bg-red-100' :
                  insight.type === 'warning' ? 'bg-amber-100' :
                  'bg-green-100'
                }`}>
                  {insight.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[15px] mb-1 tracking-tight">{insight.title}</h4>
                  <p className="text-sm opacity-80 font-medium leading-relaxed">{insight.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
