import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "O título deve ter no mínimo 3 caracteres."),
description: z.string().optional().default(''),
completed: z.boolean().default(false),
  userId: z.string().uuid("ID de usuário inválido"),
});
