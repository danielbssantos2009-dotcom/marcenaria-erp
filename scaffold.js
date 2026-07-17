const fs = require('fs');
const path = require('path');

const routes = [
  { path: 'projetos', title: 'Projetos' },
  { path: 'producao', title: 'Produção' },
  { path: 'instalacoes', title: 'Instalações' },
  { path: 'agenda', title: 'Agenda' },
  { path: 'clientes', title: 'Clientes' },
  { path: 'orcamentos', title: 'Orçamentos' },
  { path: 'financeiro', title: 'Financeiro' },
  { path: 'fluxo-caixa', title: 'Fluxo de Caixa' },
  { path: 'relatorios', title: 'Relatórios' }
];

const basePath = path.join(__dirname, 'src', 'app');

routes.forEach(route => {
  const dir = path.join(basePath, route.path);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const pageContent = `export default function Page() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="card h-[400px] flex flex-col items-center justify-center border-dashed border-2 border-zinc-800 bg-transparent text-center">
        <h2 className="text-3xl font-bold mb-4 tracking-tight text-white">${route.title}</h2>
        <p className="text-zinc-500 font-medium text-sm">Este módulo está em desenvolvimento e será conectado ao banco de dados em breve.</p>
      </div>
    </div>
  );
}
`;
  
  fs.writeFileSync(path.join(dir, 'page.tsx'), pageContent);
});

console.log('Pages scaffolded successfully.');
