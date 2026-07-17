const data = {
  projects: [
    { id: 'P-212', client: 'Alves Arquitetura', name: 'Mobiliário Corporativo', status: 'Corte', val: 'R$ 42.800', date: '22 Ago', class: 'yellow' },
    { id: 'P-211', client: 'Cond. Vista Verde', name: 'Salão de Festas', status: 'Montagem', val: 'R$ 128.500', date: '25 Ago', class: 'blue' },
    { id: 'P-210', client: 'Marina S.', name: 'Cozinha Planejada', status: 'Acabamento', val: 'R$ 36.900', date: '18 Ago', class: 'green' },
    { id: 'P-209', client: 'Escritório Rocha', name: 'Mesas Diretoria', status: 'Expedição', val: 'R$ 74.200', date: '20 Ago', class: 'dark' },
    { id: 'P-208', client: 'Almeida Interiores', name: 'Quarto Solteiro', status: 'Projeto', val: 'R$ 58.400', date: '30 Ago', class: 'red' },
    { id: 'P-207', client: 'Carlos Santos', name: 'Guarda-roupa Casal', status: 'Corte', val: 'R$ 12.000', date: '15 Set', class: 'yellow' },
    { id: 'P-206', client: 'Ana Costa', name: 'Home Theater', status: 'Montagem', val: 'R$ 8.200', date: '01 Set', class: 'blue' },
  ],
  clients: [
    { id: 'C-041', name: 'Alves Arquitetura', email: 'contato@alvesarq.com', phone: '(11) 98765-4321', total: 'R$ 142.800' },
    { id: 'C-042', name: 'Cond. Vista Verde', email: 'sindico@vistaverde.com', phone: '(11) 91234-5678', total: 'R$ 128.500' },
    { id: 'C-043', name: 'Marina S.', email: 'marina@email.com', phone: '(11) 99876-5432', total: 'R$ 36.900' },
    { id: 'C-044', name: 'Escritório Rocha', email: 'adm@rochaadv.com', phone: '(11) 97777-8888', total: 'R$ 254.200' },
    { id: 'C-045', name: 'Almeida Interiores', email: 'projetos@almeida.com', phone: '(11) 96666-5555', total: 'R$ 58.400' },
  ],
  agenda: [
    { time: '08:30', title: 'Visita técnica — Ap. Vila Nova', type: 'VISITA', class: 'blue' },
    { time: '10:00', title: 'Reunião cliente #041 Rocha', type: 'REUNIÃO', class: 'dark' },
    { time: '13:30', title: 'Instalação — Cozinha Marina', type: 'INSTALAÇÃO', class: 'yellow' },
    { time: '16:00', title: 'Aprovação de projeto Almeida', type: 'APROVAÇÃO', class: 'red' },
    { time: '17:30', title: 'Fechamento de caixa diário', type: 'FINANCEIRO', class: 'green' },
  ],
  cashflow: [
    { date: '17 Jul', desc: 'Entrada - Sinal P-212', type: 'IN', val: 'R$ 21.400,00' },
    { date: '16 Jul', desc: 'Pagamento Fornecedor (MDF)', type: 'OUT', val: '-R$ 8.500,00' },
    { date: '15 Jul', desc: 'Entrada - Quitação P-190', type: 'IN', val: 'R$ 15.000,00' },
    { date: '14 Jul', desc: 'Manutenção Equipamentos', type: 'OUT', val: '-R$ 1.200,00' },
    { date: '14 Jul', desc: 'Energia Elétrica', type: 'OUT', val: '-R$ 850,00' },
  ],
  quotes: [
    { id: 'OR-341', client: 'Construtora Alfa', desc: 'Armários Vestiário', val: 'R$ 22.000', status: 'Aguardando', class: 'yellow' },
    { id: 'OR-342', client: 'Roberto Silva', desc: 'Painel TV', val: 'R$ 4.500', status: 'Aprovado', class: 'green' },
    { id: 'OR-343', client: 'Clinica Beta', desc: 'Recepção Completa', val: 'R$ 38.000', status: 'Aguardando', class: 'yellow' },
    { id: 'OR-344', client: 'Juliana Paes', desc: 'Gabinete Banheiro', val: 'R$ 1.800', status: 'Recusado', class: 'red' },
  ]
};

const pages = {
  dashboard: () => `
    <!-- Top KPIs -->
    <div class="grid grid-cols-4 mb-8">
      <div class="card kpi-card red">
        <div class="kpi-title">Projetos Ativos</div>
        <div class="kpi-value">24</div>
        <div class="kpi-sub">8 em produção <strong style="color:var(--text-main)">+3 semana</strong></div>
      </div>
      <div class="card kpi-card green">
        <div class="kpi-title">Receita &bull; Mês</div>
        <div class="kpi-value"><span style="font-size: 20px; font-weight: 600; color: var(--text-muted);">R$</span> 384.2K</div>
        <div class="kpi-sub">Meta R$ 420K <strong style="color:var(--text-main)">91.5%</strong></div>
      </div>
      <div class="card kpi-card blue">
        <div class="kpi-title">A Receber &bull; 30D</div>
        <div class="kpi-value"><span style="font-size: 20px; font-weight: 600; color: var(--text-muted);">R$</span> 128.6K</div>
        <div class="kpi-sub">7 títulos <strong style="color:var(--text-main)">&uarr; 12.4%</strong></div>
      </div>
      <div class="card kpi-card yellow">
        <div class="kpi-title">Instalações Semana</div>
        <div class="kpi-value">06</div>
        <div class="kpi-sub">2 em rota hoje <strong style="color:var(--text-main)">—</strong></div>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-12">
      <div class="col-span-8">
        <div class="card mb-6">
          <span class="section-title">OPERAÇÃO &bull; 24H</span>
          <h2 class="section-header">Pipeline de Produção</h2>
          
          <div class="pipeline">
            <div class="pipeline-step"><div class="pipe-label">Projeto</div><div class="pipe-value mono">05</div><div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 20%;"></div></div><div class="pipe-meta">20% do total</div></div>
            <div class="pipeline-step"><div class="pipe-label">Corte</div><div class="pipe-value mono">04</div><div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 16%;"></div></div><div class="pipe-meta">16% do total</div></div>
            <div class="pipeline-step"><div class="pipe-label">Montagem</div><div class="pipe-value mono">06</div><div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 25%;"></div></div><div class="pipe-meta">25% do total</div></div>
            <div class="pipeline-step"><div class="pipe-label">Acabamento</div><div class="pipe-value mono">05</div><div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 21%;"></div></div><div class="pipe-meta">21% do total</div></div>
            <div class="pipeline-step"><div class="pipe-label">Expedição</div><div class="pipe-value mono">04</div><div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 18%;"></div></div><div class="pipe-meta">18% do total</div></div>
          </div>

          <span class="section-title" style="margin-top: 32px;">RECEITA &bull; 12 MESES (R$ MIL)</span>
          <div class="chart-container"><canvas id="revenueChart"></canvas></div>
        </div>
      </div>

      <div class="col-span-4">
        <div class="card" style="height: 100%;">
          <span class="section-title">17 JAN &bull; SEXTA</span>
          <h2 class="section-header">Agenda de Hoje</h2>
          <div>
            ${data.agenda.map(a => `
              <div class="list-item flex-between gap-4">
                <div class="mono text-muted text-sm" style="width: 45px;">${a.time}</div>
                <div class="text-sm" style="flex:1;">${a.title}</div>
                <div class="badge ${a.class}">${a.type}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Grid -->
    <div class="grid grid-cols-12" style="margin-top: 24px;">
      <div class="col-span-6">
        <div class="card">
          <span class="section-title">ATENÇÃO</span>
          <h2 class="section-header">Alertas Operacionais</h2>
          <div class="list-item flex-between gap-4"><div class="badge red">URGENTE</div><div class="mono text-muted text-sm" style="width: 60px;">P-198</div><div class="text-sm" style="flex:1;">Prazo de entrega em 2 dias — acabamento pendente</div></div>
          <div class="list-item flex-between gap-4"><div class="badge yellow">REVER</div><div class="mono text-muted text-sm" style="width: 60px;">OR-341</div><div class="text-sm" style="flex:1;">Orçamento aguardando resposta há 6 dias</div></div>
          <div class="list-item flex-between gap-4"><div class="badge yellow">REVER</div><div class="mono text-muted text-sm" style="width: 60px;">F-2201</div><div class="text-sm" style="flex:1;">Fatura vence em 48h — Rocha & Filhos</div></div>
          <div class="list-item flex-between gap-4"><div class="badge blue">INFO</div><div class="mono text-muted text-sm" style="width: 60px;">AG-19</div><div class="text-sm" style="flex:1;">Deslocamento de instalação reagendado</div></div>
        </div>
      </div>
      <div class="col-span-6">
        <div class="card">
          <span class="section-title">MOVIMENTAÇÃO</span>
          <h2 class="section-header">Últimos Projetos</h2>
          <table>
            <thead><tr><th>CÓD.</th><th>CLIENTE</th><th>ETAPA</th><th class="text-right">VALOR</th></tr></thead>
            <tbody>
              ${data.projects.slice(0,5).map(p => `
                <tr><td class="mono text-muted">${p.id}</td><td>${p.client}</td><td><span class="badge ${p.class}">${p.status}</span></td><td class="text-right mono">${p.val}</td></tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,

  projetos: () => `
    <div class="card mb-6 flex-between">
      <div>
        <h2 class="section-header" style="margin-bottom:0;">Todos os Projetos</h2>
      </div>
      <div>
        <button class="badge dark" style="padding: 10px 20px; border:none; cursor:pointer;">+ NOVO PROJETO</button>
      </div>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>CÓDIGO</th><th>NOME DO PROJETO</th><th>CLIENTE</th><th>PRAZO</th><th>STATUS</th><th class="text-right">VALOR</th></tr></thead>
        <tbody>
          ${data.projects.map(p => `
            <tr>
              <td class="mono text-muted">${p.id}</td>
              <td class="font-bold">${p.name}</td>
              <td>${p.client}</td>
              <td class="mono">${p.date}</td>
              <td><span class="badge ${p.class}">${p.status}</span></td>
              <td class="text-right mono">${p.val}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `,

  producao: () => {
    const columns = [
      { name: 'Corte', id: 'Corte', color: 'yellow' },
      { name: 'Montagem', id: 'Montagem', color: 'blue' },
      { name: 'Acabamento', id: 'Acabamento', color: 'green' },
      { name: 'Expedição', id: 'Expedição', color: 'dark' },
    ];
    return `
      <div style="display:flex; gap:24px; overflow-x:auto; height:calc(100vh - 200px);">
        ${columns.map(col => `
          <div style="flex:1; min-width:300px; display:flex; flex-direction:column; background: #ececf1; padding: 16px; border-radius: 4px;">
            <div style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--text-muted); margin-bottom:16px;">
              ${col.name} <span class="badge outline" style="margin-left:8px; border-color:var(--border-light);">${data.projects.filter(p => p.status === col.id).length}</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:12px;">
              ${data.projects.filter(p => p.status === col.id).map(p => `
                <div class="card" style="padding:16px; border-left: 3px solid var(--color-${col.color}); cursor:grab;">
                  <div class="flex-between mb-6">
                    <span class="mono text-xs">${p.id}</span>
                    <span class="badge outline">${p.date}</span>
                  </div>
                  <div class="font-bold" style="font-size:14px; margin-bottom:4px;">${p.name}</div>
                  <div class="text-sm text-muted">${p.client}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  instalacoes: () => `
    <div class="card mb-6">
      <h2 class="section-header">Rotas de Instalação</h2>
      <p class="text-muted text-sm">Visualização das equipes em campo hoje.</p>
    </div>
    <div class="grid grid-cols-2">
      <div class="card">
        <span class="section-title">Equipe Alfa</span>
        <div class="list-item" style="flex-direction:column; align-items:flex-start;">
          <div class="flex-between" style="width:100%; margin-bottom:12px;">
            <span class="badge yellow">EM ANDAMENTO</span>
            <span class="mono text-xs">P-210</span>
          </div>
          <div class="font-bold mb-6">Cozinha Planejada - Marina S.</div>
          <div class="text-sm text-muted">Av. Paulista, 1000 - Bela Vista</div>
        </div>
      </div>
      <div class="card">
        <span class="section-title">Equipe Beta</span>
        <div class="list-item" style="flex-direction:column; align-items:flex-start;">
          <div class="flex-between" style="width:100%; margin-bottom:12px;">
            <span class="badge green">CONCLUÍDO</span>
            <span class="mono text-xs">P-199</span>
          </div>
          <div class="font-bold mb-6">Móveis Banheiro - Cliente Y</div>
          <div class="text-sm text-muted">Rua Augusta, 500 - Consolação</div>
        </div>
      </div>
    </div>
  `,

  agenda: () => `
    <div class="card">
      <div class="flex-between mb-8">
        <h2 class="section-header" style="margin:0;">Agenda Completa</h2>
        <input type="date" class="card" style="padding: 8px; border: 1px solid var(--border-light); font-family: var(--font-mono);">
      </div>
      ${data.agenda.map(a => `
        <div class="list-item flex-between gap-4" style="padding: 16px 0;">
          <div class="mono font-bold text-lg" style="width: 80px;">${a.time}</div>
          <div class="text-md font-bold" style="flex:1;">${a.title}</div>
          <div class="badge ${a.class}" style="padding:8px 16px;">${a.type}</div>
        </div>
      `).join('')}
    </div>
  `,

  clientes: () => `
    <div class="card mb-6 flex-between">
      <h2 class="section-header" style="margin:0;">Gestão de Clientes (CRM)</h2>
      <button class="badge blue" style="padding: 10px 20px; border:none; cursor:pointer;">+ ADICIONAR CLIENTE</button>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>ID</th><th>NOME DO CLIENTE</th><th>EMAIL</th><th>TELEFONE</th><th class="text-right">TOTAL GASTO</th></tr></thead>
        <tbody>
          ${data.clients.map(c => `
            <tr>
              <td class="mono text-muted">${c.id}</td>
              <td class="font-bold">${c.name}</td>
              <td>${c.email}</td>
              <td class="mono">${c.phone}</td>
              <td class="text-right mono font-bold">${c.total}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `,

  orcamentos: () => `
    <div class="card mb-6">
      <h2 class="section-header" style="margin:0;">Orçamentos Pendentes e Ativos</h2>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>Nº ORÇAMENTO</th><th>CLIENTE</th><th>DESCRIÇÃO</th><th>STATUS</th><th class="text-right">VALOR PREVISTO</th><th>AÇÕES</th></tr></thead>
        <tbody>
          ${data.quotes.map(q => `
            <tr>
              <td class="mono text-muted">${q.id}</td>
              <td class="font-bold">${q.client}</td>
              <td>${q.desc}</td>
              <td><span class="badge ${q.class}">${q.status}</span></td>
              <td class="text-right mono">${q.val}</td>
              <td style="text-align:right;">
                <button class="badge outline" style="cursor:pointer;">EDITAR</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `,

  financeiro: () => `
    <div class="grid grid-cols-2 mb-8">
      <div class="card kpi-card green">
        <div class="kpi-title">Faturamento Total (Ano)</div>
        <div class="kpi-value"><span style="font-size: 20px; font-weight: 600; color: var(--text-muted);">R$</span> 2.450.000</div>
      </div>
      <div class="card kpi-card red">
        <div class="kpi-title">Despesas (Ano)</div>
        <div class="kpi-value"><span style="font-size: 20px; font-weight: 600; color: var(--text-muted);">R$</span> 980.500</div>
      </div>
    </div>
    <div class="card">
      <h2 class="section-header">Desempenho Financeiro</h2>
      <div class="chart-container" style="height: 300px;">
        <canvas id="financeChart"></canvas>
      </div>
    </div>
  `,

  fluxo_caixa: () => `
    <div class="card mb-6 flex-between">
      <h2 class="section-header" style="margin:0;">Fluxo de Caixa (Julho)</h2>
      <button class="badge dark" style="padding: 10px 20px; border:none; cursor:pointer;">EXPORTAR CSV</button>
    </div>
    <div class="card">
      <table>
        <thead><tr><th>DATA</th><th>TIPO</th><th>DESCRIÇÃO</th><th class="text-right">VALOR</th></tr></thead>
        <tbody>
          ${data.cashflow.map(c => `
            <tr>
              <td class="mono text-muted">${c.date}</td>
              <td><span class="badge ${c.type === 'IN' ? 'green' : 'red'}">${c.type}</span></td>
              <td class="font-bold">${c.desc}</td>
              <td class="text-right mono" style="color: ${c.type === 'IN' ? 'var(--color-green)' : 'var(--color-red)'}; font-weight:700;">${c.val}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `,

  relatorios: () => `
    <div class="card mb-6">
      <h2 class="section-header" style="margin:0;">Central de Relatórios</h2>
    </div>
    <div class="grid grid-cols-4">
      <div class="card" style="align-items:center; text-align:center; padding: 40px 24px; cursor:pointer;">
        <div style="font-size: 40px; margin-bottom:16px;">📄</div>
        <div class="font-bold mb-6">Relatório Mensal de Produção</div>
        <button class="badge outline">BAIXAR PDF</button>
      </div>
      <div class="card" style="align-items:center; text-align:center; padding: 40px 24px; cursor:pointer;">
        <div style="font-size: 40px; margin-bottom:16px;">📈</div>
        <div class="font-bold mb-6">DRE e Balanço Financeiro</div>
        <button class="badge outline">BAIXAR EXCEL</button>
      </div>
      <div class="card" style="align-items:center; text-align:center; padding: 40px 24px; cursor:pointer;">
        <div style="font-size: 40px; margin-bottom:16px;">👥</div>
        <div class="font-bold mb-6">Performance de Equipes</div>
        <button class="badge outline">BAIXAR PDF</button>
      </div>
    </div>
  `
};

const router = {
  routes: pages,
  navigate(path, title) {
    if (this.routes[path]) {
      // Update nav active state
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
      const activeNav = document.querySelector(`.nav-item[data-path="${path}"]`);
      if (activeNav) activeNav.classList.add('active');
      
      // Update Header Title dynamically
      if(title) {
        document.querySelector('.header-title').innerText = title;
      }
      
      // Render Content
      const container = document.getElementById('page-container');
      container.innerHTML = this.routes[path]();

      // Trigger Chart initializations if necessary
      if(path === 'dashboard') initDashboardChart();
      if(path === 'financeiro') initFinanceChart();
    }
  }
};

function initDashboardChart() {
  setTimeout(() => {
    const ctx = document.getElementById('revenueChart');
    if (ctx && !window.dashboardChartInstance) {
      window.dashboardChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
          datasets: [{
            label: 'Receita',
            data: [120, 150, 180, 140, 200, 250, 280, 310, 320, 290, 340, 384],
            borderColor: '#e11d48',
            backgroundColor: 'rgba(225, 29, 72, 0.1)',
            borderWidth: 2,
            pointBackgroundColor: '#e11d48',
            pointRadius: 3,
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } },
          scales: { y: { display: false, min: 0 }, x: { grid: { display: false, drawBorder: false }, ticks: { font: { family: 'Space Mono', size: 10 }, color: '#71717a' } } }
        }
      });
    }
  }, 50);
}

function initFinanceChart() {
  setTimeout(() => {
    const ctx = document.getElementById('financeChart');
    if (ctx && !window.financeChartInstance) {
      window.financeChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL'],
          datasets: [
            { label: 'Receitas', data: [300, 320, 310, 380, 350, 390, 400], backgroundColor: '#16a34a' },
            { label: 'Despesas', data: [200, 180, 190, 210, 200, 180, 160], backgroundColor: '#e11d48' }
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          scales: { x: { grid: { display: false } } }
        }
      });
    }
  }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const path = e.currentTarget.dataset.path;
      const title = e.currentTarget.dataset.title;
      if(path) router.navigate(path, title);
    });
  });
  
  // Default route
  router.navigate('dashboard', 'Dashboard');
});
