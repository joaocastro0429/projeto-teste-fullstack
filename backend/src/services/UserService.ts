import { prisma } from "../prisma";
import bcrypt from 'bcryptjs'

export const register = async (email: string, password: string) => {
  return await prisma.user.create({
    data: {
      email,
      password
    },

  })

}

export const login = async (email: string, password: string) => {
  try {
    // Buscar o usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email },
    })

    // Verificar se o usuário existe
    if (!user) {
      throw new Error('User not found')
    }

    // Comparar a senha fornecida com a senha armazenada
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid password')
    }

    return user
  } catch (error: any) {
    throw new Error(error.message || 'Error during login')
  }
}