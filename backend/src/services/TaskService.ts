import { prisma } from '../prisma/index';

// Define the interface for a product
export interface Task {
  id?: string;
  title: string;
  description: string;
  completed: boolean; 
  userId: string
}

// Fetch all products
export const getTask = async () => {
  try {
    const products = await prisma.task.findMany();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');
  }
};

// Function to create a product
export const createTask = async ({
  title,
  description,
  completed,
  userId,
}: Task) => {
  try {
    const task = await prisma.task.create({
      data: {
        title,
        description,
        completed,
        userId,
      },
    });
    return task;
  } catch (error: any) {
    console.error('Error creating task:', error);
    throw new Error(error.message || 'Error creating task');
  }
};


// Function to update a product
export const updateTask = async (
  id: string,
  { title, description, completed ,userId}: Task
) => {
  try {
    // Verifica se a task existe
    const existingTask = await prisma.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new Error('Task not found');
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        completed,
        userId // Preserva o userId existente
        
        
      },
    });

    return task;
  } catch (error: any) {
    console.error('Error updating task:', error);
    throw new Error(error.message || 'Error updating task');
  }
};

// Function to delete a product
export const deleteTask = async (id: string) => {
  try {
    const product = await prisma.task.delete({
      where: { id },
    });
    return product;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Error deleting product');
  }
};