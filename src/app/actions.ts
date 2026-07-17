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
