import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.agendaEvent.deleteMany();

  const c1 = await prisma.client.create({ data: { name: 'Alves Arquitetura', email: 'contato@alvesarq.com', total: 142800 } });
  const c2 = await prisma.client.create({ data: { name: 'Marina S.', email: 'marina@email.com', total: 36900 } });

  await prisma.project.create({ data: { code: 'P-212', name: 'Mobiliário Corporativo', status: 'Corte', value: 42800, clientId: c1.id } });
  await prisma.project.create({ data: { code: 'P-211', name: 'Cozinha Planejada', status: 'Acabamento', value: 36900, clientId: c2.id } });

  await prisma.transaction.createMany({
    data: [
      { type: 'IN', description: 'Entrada - Sinal P-212', value: 21400 },
      { type: 'OUT', description: 'Pagamento Fornecedor (MDF)', value: -8500 },
      { type: 'IN', description: 'Quitação P-190', value: 15000 }
    ]
  });

  await prisma.agendaEvent.createMany({
    data: [
      { title: 'Visita técnica — Ap. Vila Nova', type: 'VISITA', time: '08:30', date: new Date() },
      { title: 'Reunião cliente #041', type: 'REUNIÃO', time: '10:00', date: new Date() }
    ]
  });

  console.log('Database seeded!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
