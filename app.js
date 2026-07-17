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
      
      <!-- Left Column (Pipeline & Chart) -->
      <div class="col-span-8">
        <div class="card mb-6">
          <span class="section-title">OPERAÇÃO &bull; 24H</span>
          <h2 class="section-header">Pipeline de Produção</h2>
          
          <div class="pipeline">
            <div class="pipeline-step">
              <div class="pipe-label">Projeto</div>
              <div class="pipe-value mono">05</div>
              <div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 20%;"></div></div>
              <div class="pipe-meta">20% do total</div>
            </div>
            <div class="pipeline-step">
              <div class="pipe-label">Corte</div>
              <div class="pipe-value mono">04</div>
              <div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 16%;"></div></div>
              <div class="pipe-meta">16% do total</div>
            </div>
            <div class="pipeline-step">
              <div class="pipe-label">Montagem</div>
              <div class="pipe-value mono">06</div>
              <div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 25%;"></div></div>
              <div class="pipe-meta">25% do total</div>
            </div>
            <div class="pipeline-step">
              <div class="pipe-label">Acabamento</div>
              <div class="pipe-value mono">05</div>
              <div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 21%;"></div></div>
              <div class="pipe-meta">21% do total</div>
            </div>
            <div class="pipeline-step">
              <div class="pipe-label">Expedição</div>
              <div class="pipe-value mono">04</div>
              <div class="pipe-bar-bg"><div class="pipe-bar-fill" style="width: 18%;"></div></div>
              <div class="pipe-meta">18% do total</div>
            </div>
          </div>

          <span class="section-title" style="margin-top: 32px;">RECEITA &bull; 12 MESES (R$ MIL)</span>
          <div class="chart-container">
            <canvas id="revenueChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Right Column (Agenda) -->
      <div class="col-span-4">
        <div class="card" style="height: 100%;">
          <span class="section-title">17 JAN &bull; SEXTA</span>
          <h2 class="section-header">Agenda de Hoje</h2>
          
          <div>
            <div class="list-item flex-between gap-4">
              <div class="mono text-muted text-sm" style="width: 45px;">08:30</div>
              <div class="text-sm" style="flex:1;">Visita técnica — Ap. Vila N...</div>
              <div class="badge blue">VISITA</div>
            </div>
            <div class="list-item flex-between gap-4">
              <div class="mono text-muted text-sm" style="width: 45px;">10:00</div>
              <div class="text-sm" style="flex:1;">Reunião cliente #041 Rocha</div>
              <div class="badge dark">REUNIÃO</div>
            </div>
            <div class="list-item flex-between gap-4">
              <div class="mono text-muted text-sm" style="width: 45px;">13:30</div>
              <div class="text-sm" style="flex:1;">Instalação — Cozinha...</div>
              <div class="badge yellow">INSTALAÇÃO</div>
            </div>
            <div class="list-item flex-between gap-4">
              <div class="mono text-muted text-sm" style="width: 45px;">16:00</div>
              <div class="text-sm" style="flex:1;">Aprovação de projeto ...</div>
              <div class="badge red">APROVAÇÃO</div>
            </div>
            <div class="list-item flex-between gap-4">
              <div class="mono text-muted text-sm" style="width: 45px;">17:30</div>
              <div class="text-sm" style="flex:1;">Fechamento de caixa...</div>
              <div class="badge green">FINANCEIRO</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Grid (Alerts & Projects) -->
    <div class="grid grid-cols-12" style="margin-top: 24px;">
      
      <!-- Alerts -->
      <div class="col-span-6">
        <div class="card">
          <span class="section-title">ATENÇÃO</span>
          <h2 class="section-header">Alertas Operacionais</h2>
          
          <div class="list-item flex-between gap-4">
            <div class="badge red">URGENTE</div>
            <div class="mono text-muted text-sm" style="width: 60px;">P-198</div>
            <div class="text-sm" style="flex:1;">Prazo de entrega em 2 dias — acabamento pendente</div>
          </div>
          <div class="list-item flex-between gap-4">
            <div class="badge yellow">REVER</div>
            <div class="mono text-muted text-sm" style="width: 60px;">OR-341</div>
            <div class="text-sm" style="flex:1;">Orçamento aguardando resposta há 6 dias</div>
          </div>
          <div class="list-item flex-between gap-4">
            <div class="badge yellow">REVER</div>
            <div class="mono text-muted text-sm" style="width: 60px;">F-2201</div>
            <div class="text-sm" style="flex:1;">Fatura vence em 48h — Rocha & Filhos</div>
          </div>
          <div class="list-item flex-between gap-4">
            <div class="badge blue">INFO</div>
            <div class="mono text-muted text-sm" style="width: 60px;">AG-19</div>
            <div class="text-sm" style="flex:1;">Deslocamento de instalação reagendado</div>
          </div>
        </div>
      </div>

      <!-- Recent Projects -->
      <div class="col-span-6">
        <div class="card">
          <span class="section-title">MOVIMENTAÇÃO</span>
          <h2 class="section-header">Últimos Projetos</h2>
          
          <table>
            <thead>
              <tr>
                <th>CÓD.</th>
                <th>CLIENTE</th>
                <th>ETAPA</th>
                <th class="text-right">VALOR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="mono text-muted">P-212</td>
                <td>Alves Arquitetura</td>
                <td><span class="badge yellow">CORTE</span></td>
                <td class="text-right mono">R$ 42.800</td>
              </tr>
              <tr>
                <td class="mono text-muted">P-211</td>
                <td>Cond. Vista Verde</td>
                <td><span class="badge blue">MONTAGEM</span></td>
                <td class="text-right mono">R$ 128.500</td>
              </tr>
              <tr>
                <td class="mono text-muted">P-210</td>
                <td>Marina S.</td>
                <td><span class="badge green">ACABAMENTO</span></td>
                <td class="text-right mono">R$ 36.900</td>
              </tr>
              <tr>
                <td class="mono text-muted">P-209</td>
                <td>Escritório Rocha</td>
                <td><span class="badge dark">EXPEDIÇÃO</span></td>
                <td class="text-right mono">R$ 74.200</td>
              </tr>
              <tr>
                <td class="mono text-muted">P-208</td>
                <td>Almeida Interiores</td>
                <td><span class="badge red">PROJETO</span></td>
                <td class="text-right mono">R$ 58.400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('page-container');
  container.innerHTML = pages.dashboard();

  // Initialize Chart.js
  setTimeout(() => {
    const ctx = document.getElementById('revenueChart');
    if (ctx) {
      new Chart(ctx, {
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
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { display: false, min: 0 },
            x: { 
              grid: { display: false, drawBorder: false },
              ticks: { font: { family: 'Space Mono', size: 10 }, color: '#71717a' }
            }
          }
        }
      });
    }
  }, 100);
});
