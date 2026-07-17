const router = {
  routes: {},
  add(path, handler) {
    this.routes[path] = handler;
  },
  navigate(path) {
    if (this.routes[path]) {
      document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
      const activeNav = document.querySelector(`.nav-item[data-path="${path}"]`);
      if (activeNav) activeNav.classList.add('active');
      
      const container = document.getElementById('page-container');
      container.innerHTML = this.routes[path]();
    }
  }
};

const data = {
  projects: [
    { id: 'P-101', name: 'Armários Cozinha', client: 'João Silva', status: 'fabricacao', value: 'R$ 14.500', date: '12 Ago 2026' },
    { id: 'P-102', name: 'Home Theater', client: 'Maria Oliveira', status: 'medicao', value: 'R$ 8.200', date: '15 Ago 2026' },
    { id: 'P-103', name: 'Guarda-roupa Casal', client: 'Carlos Santos', status: 'orcamento', value: 'R$ 12.000', date: '20 Ago 2026' },
    { id: 'P-104', name: 'Mesa Escritório', client: 'Ana Costa', status: 'instalacao', value: 'R$ 3.500', date: '25 Ago 2026' }
  ],
  clients: [
    { id: 'C-001', name: 'João Silva', email: 'joao@email.com', phone: '(11) 98765-4321', totalSpent: 'R$ 25.000' },
    { id: 'C-002', name: 'Maria Oliveira', email: 'maria@email.com', phone: '(11) 91234-5678', totalSpent: 'R$ 8.200' },
    { id: 'C-003', name: 'Carlos Santos', email: 'carlos@email.com', phone: '(11) 99876-5432', totalSpent: 'R$ 42.000' }
  ]
};

const pages = {
  dashboard: () => `
    <h1>Dashboard</h1>
    <div class="grid grid-cols-4 mb-lg">
      <div class="card">
        <div class="card-title">Receita Mensal</div>
        <div class="metric-value">R$ 42.500</div>
      </div>
      <div class="card">
        <div class="card-title">Projetos Ativos</div>
        <div class="metric-value">12</div>
      </div>
      <div class="card">
        <div class="card-title">Instalações Hoje</div>
        <div class="metric-value">2</div>
      </div>
      <div class="card">
        <div class="card-title">Aprovação Pend.</div>
        <div class="metric-value">5</div>
      </div>
    </div>
    
    <div class="grid grid-cols-2">
      <div>
        <h3 class="mb-lg">Projetos Recentes</h3>
        <div class="table-wrapper">
          <table>
            <thead><tr><th>ID</th><th>Projeto</th><th>Status</th><th>Valor</th></tr></thead>
            <tbody>
              ${data.projects.slice(0,4).map(p => `
                <tr>
                  <td class="mono">${p.id}</td>
                  <td><strong>${p.name}</strong></td>
                  <td><span class="badge ${p.status === 'instalacao' ? 'danger' : 'outline'}">${p.status}</span></td>
                  <td class="text-right mono">${p.value}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 class="mb-lg">Agenda de Instalações</h3>
        <div class="card" style="padding: 0; border: none; border-top: 2px solid var(--border-dark);">
          ${data.projects.filter(p => p.status === 'instalacao').map(p => `
            <div style="padding: var(--spacing-md) 0; border-bottom: 1px solid var(--border-color);">
              <div class="flex-between">
                <strong style="font-size: var(--font-lg); letter-spacing: -0.02em;">${p.date}</strong>
                <span class="badge danger mono">${p.id}</span>
              </div>
              <div style="margin-top: var(--spacing-xs); font-weight: 500; font-size: var(--font-sm); text-transform: uppercase;">
                ${p.name} <span style="color: var(--text-secondary);">// ${p.client}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `,
  
  kanban: () => `
    <h1>Produção</h1>
    <div class="kanban-board">
      ${['orcamento', 'medicao', 'fabricacao', 'instalacao'].map(col => `
        <div class="kanban-column">
          <div class="kanban-header">${col.toUpperCase()}</div>
          ${data.projects.filter(p => p.status === col).map(p => `
            <div class="kanban-item" draggable="true">
              <div class="kanban-item-title">${p.name}</div>
              <div class="kanban-item-meta mono mb-lg">${p.id} <br> ${p.client}</div>
              <div class="flex-between">
                <span class="badge danger">${p.date}</span>
              </div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `,
  
  clients: () => `
    <div class="flex-between mb-lg">
      <h1>Clientes</h1>
      <button class="badge danger" style="padding: 12px 24px; font-size: var(--font-sm); cursor: pointer; border:none; letter-spacing: 0.1em;">NOVO CLIENTE</button>
    </div>
    <div class="table-wrapper">
      <table>
        <thead><tr><th>ID</th><th>Nome</th><th>Contato</th><th>Telefone</th><th class="text-right">Total Gasto</th></tr></thead>
        <tbody>
          ${data.clients.map(c => `
            <tr>
              <td class="mono">${c.id}</td>
              <td><strong>${c.name}</strong></td>
              <td>${c.email}</td>
              <td class="mono">${c.phone}</td>
              <td class="text-right mono">${c.totalSpent}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
};

router.add('dashboard', pages.dashboard);
router.add('kanban', pages.kanban);
router.add('clients', pages.clients);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      router.navigate(e.target.dataset.path);
    });
  });
  
  router.navigate('dashboard');
});
