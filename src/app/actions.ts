'use server'

import { PrismaClient } from '@prisma/client'
import { revalidatePath } from 'next/cache'

const prisma = new PrismaClient()

export async function addTransaction(formData: FormData) {
  const type = formData.get('type') as string
  const description = formData.get('description') as string
  const value = parseFloat(formData.get('value') as string)

  await prisma.transaction.create({
    data: {
      type,
      description,
      value: type === 'OUT' ? -Math.abs(value) : Math.abs(value)
    }
  })

  // Revalida a página inicial para atualizar a lista instantaneamente
  revalidatePath('/')
}

export async function addClient(formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string
  const address = formData.get('address') as string

  await prisma.client.create({
    data: { name, phone, address }
  })
  
  revalidatePath('/clientes')
  revalidatePath('/projetos')
}

export async function addProject(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const clientId = formData.get('clientId') as string
    const value = parseFloat((formData.get('value') as string).replace(/\./g, '').replace(',', '.'))
    const deadlineStr = formData.get('deadline') as string
    const isBudget = formData.get('isBudget') === 'on'
    
    if (!name || !clientId || isNaN(value)) {
      return { error: 'Preencha todos os campos obrigatórios corretamente.' }
    }

    await prisma.project.create({
      data: {
        name,
        clientId,
        value,
        status: isBudget ? 'ORCAMENTO' : 'PRODUCAO',
        deadline: deadlineStr ? new Date(deadlineStr) : null
      }
    })
    
    revalidatePath('/projetos')
    revalidatePath('/producao')
    revalidatePath('/orcamentos')
    revalidatePath('/')
    
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Ocorreu um erro ao salvar.' }
  }
}

export async function addAgendaEvent(formData: FormData) {
  const title = formData.get('title') as string
  const dateStr = formData.get('date') as string
  const time = formData.get('time') as string
  
  await prisma.agendaEvent.create({
    data: {
      title,
      date: new Date(dateStr),
      time: time || null
    }
  })
  
  revalidatePath('/agenda')
}

export async function updateProjectStatus(projectId: string, newStatus: string) {
  await prisma.project.update({
    where: { id: projectId },
    data: { status: newStatus }
  })
  
  revalidatePath('/projetos')
  revalidatePath('/orcamentos')
  revalidatePath('/producao')
  revalidatePath('/instalacoes')
}

export async function wipeDatabase() {
  // ATENÇÃO: Apaga todos os dados do banco!
  await prisma.client.deleteMany()
  await prisma.project.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.agendaEvent.deleteMany()
  
  revalidatePath('/')
  revalidatePath('/clientes')
  revalidatePath('/projetos')
  revalidatePath('/orcamentos')
  revalidatePath('/producao')
  revalidatePath('/instalacoes')
  revalidatePath('/agenda')
  revalidatePath('/financeiro')
  revalidatePath('/fluxo-caixa')
  revalidatePath('/relatorios')
}
