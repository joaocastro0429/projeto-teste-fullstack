import {Router} from "express"
import {register,login} from '../controllers/authController'

export const UserRouter = Router()

UserRouter.post('/register',register)
UserRouter.post('/login',login)


