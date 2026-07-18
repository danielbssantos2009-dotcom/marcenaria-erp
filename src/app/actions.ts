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
  revalidatePath('/financeiro')
}

export async function deleteTransaction(id: string) {
  try {
    await prisma.transaction.delete({ where: { id } })
    revalidatePath('/financeiro')
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Erro ao excluir transação.' }
  }
}

export async function addClient(formData: FormData) {
  try {
    const name = formData.get('name') as string
    let phone = formData.get('phone') as string
    const address = formData.get('address') as string

    if (!name) return { error: 'O nome do cliente é obrigatório.' }

    if (phone) {
      const hasPlus = phone.includes('+')
      const digitsOnly = phone.replace(/\D/g, '')
      
      if (hasPlus) {
        if (digitsOnly.length < 10 || digitsOnly.length > 15) {
          return { error: 'O número internacional deve ter entre 10 e 15 dígitos.' }
        }
      } else {
        if (digitsOnly.length !== 10 && digitsOnly.length !== 11) {
          return { error: 'O telefone deve conter o DDD + o número (exatamente 10 ou 11 dígitos).' }
        }
      }
    }

    await prisma.client.create({
      data: { name, phone, address }
    })
    
    revalidatePath('/clientes')
    revalidatePath('/projetos')
    
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Ocorreu um erro ao salvar o cliente.' }
  }
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
  try {
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const time = formData.get('time') as string
    const priority = formData.get('priority') as string || 'MEDIA'
    const type = formData.get('type') as string || 'OUTRO'

    if (!title || !date) {
      return { error: 'Título e data são obrigatórios.' }
    }

    const eventDate = new Date(`${date}T12:00:00Z`)

    await prisma.agendaEvent.create({
      data: {
        title,
        date: eventDate,
        time: time || null,
        priority,
        type
      }
    })

    revalidatePath('/agenda')
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Erro ao adicionar evento.' }
  }
}

export async function updateAgendaEventStatus(id: string, status: string) {
  try {
    await prisma.agendaEvent.update({
      where: { id },
      data: { status }
    })
    revalidatePath('/agenda')
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Erro ao atualizar evento.' }
  }
}

export async function deleteAgendaEvent(id: string) {
  try {
    await prisma.agendaEvent.delete({ where: { id } })
    revalidatePath('/agenda')
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Erro ao excluir evento.' }
  }
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

export async function updateQuoteStatus(projectId: string, quoteStatus: string) {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { quoteStatus }
    })
    revalidatePath('/orcamentos')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Erro ao atualizar orçamento.' }
  }
}

export async function approveQuote(projectId: string) {
  try {
    await prisma.project.update({
      where: { id: projectId },
      data: { 
        status: 'PRODUCAO', // Sai de ORCAMENTO e vira um projeto em Produção
        quoteStatus: 'APROVADO'
      }
    })
    revalidatePath('/orcamentos')
    revalidatePath('/projetos')
    revalidatePath('/producao')
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Erro ao aprovar orçamento.' }
  }
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

export async function deleteClient(id: string) {
  try {
    const projectsCount = await prisma.project.count({ where: { clientId: id } })
    if (projectsCount > 0) {
      return { error: 'Não é possível excluir um cliente que possui projetos. Arquive-o ou exclua os projetos primeiro.' }
    }
    await prisma.client.delete({ where: { id } })
    revalidatePath('/clientes')
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Erro ao excluir cliente.' }
  }
}

export async function toggleArchiveClient(id: string, currentStatus: boolean) {
  try {
    await prisma.client.update({
      where: { id },
      data: { archived: !currentStatus }
    })
    revalidatePath('/clientes')
    return { success: true }
  } catch (err: any) {
    return { error: err.message || 'Erro ao arquivar cliente.' }
  }
}
