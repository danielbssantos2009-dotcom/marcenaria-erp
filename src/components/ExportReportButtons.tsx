'use client'

import { FileText, Download } from 'lucide-react'

interface ExportData {
  clients: number;
  projectsActive: number;
  projectsCompleted: number;
  conversionRate: number;
  totalBudget: number;
  totalApproved: number;
  totalIn: number;
  totalOut: number;
}

export default function ExportReportButtons({ data }: { data: ExportData }) {
  
  const handleExportPDF = () => {
    // A própria página terá classes CSS como "print:hidden" na sidebar para gerar um PDF limpo.
    window.print();
  }

  const handleExportCSV = () => {
    const headers = ['Métrica', 'Valor']
    const rows = [
      ['Total de Clientes', data.clients],
      ['Projetos Ativos', data.projectsActive],
      ['Projetos Concluidos', data.projectsCompleted],
      ['Taxa de Conversao', `${data.conversionRate.toFixed(1)}%`],
      ['Orcamentos Abertos', `R$ ${data.totalBudget.toFixed(2)}`],
      ['Valor em Producao', `R$ ${data.totalApproved.toFixed(2)}`],
      ['Total de Receitas', `R$ ${data.totalIn.toFixed(2)}`],
      ['Total de Despesas', `R$ ${data.totalOut.toFixed(2)}`]
    ]

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(',') + "\n"
      + rows.map(e => e.join(',')).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `relatorio_marcenaria_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link) // Required for FF
    
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex items-center gap-3 print:hidden">
      <button 
        onClick={handleExportCSV}
        className="flex items-center gap-2 bg-white/60 hover:bg-white/90 backdrop-blur-sm border border-white/80 px-4 py-2.5 rounded-xl text-sm font-bold text-zinc-700 transition-all shadow-sm"
      >
        <Download size={16} /> Baixar Planilha
      </button>
      
      <button 
        onClick={handleExportPDF}
        className="flex items-center gap-2 bg-zinc-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md shadow-black/10"
      >
        <FileText size={16} /> Salvar em PDF
      </button>
    </div>
  )
}
