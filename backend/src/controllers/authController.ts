import { Request, Response } from 'express';
import * as UserService from '../services/UserService'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {loginSchema} from '../schemas/userSchema'
import { error } from 'console';

export const register = async (req: Request, res: Response) => {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success){
      res.status(400).json({error: parsed.error.format()})
      return
  }
    const { email, password } = parsed.data;



  try {
    const { email, password } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    const user = await UserService.register(email, hashPassword)
    console.log(user)
    res.status(200).json(user)
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Error login" })
  }

}

export const login = async (req: Request, res: Response): Promise<any> => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.format() });
  }

  const { email, password } = validation.data;
  
  const user = await UserService.login(email, password);
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });


  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1d' })

  return res.json({ user, token })


}