const fs = require('fs');

const files = [
  'src/app/agenda/page.tsx',
  'src/app/financeiro/page.tsx',
  'src/app/fluxo-caixa/page.tsx',
  'src/app/relatorios/page.tsx',
  'src/components/StatusDropdown.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\$/g, '$'); // Just in case $ was also escaped
  fs.writeFileSync(f, content);
  console.log('Fixed', f);
});
