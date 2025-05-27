import express from 'express'
import  router  from './router/TasktRouter'
import { UserRouter } from './router/UserRouter'
import cors from 'cors'
import helmet from 'helmet'



const server=express()

server.use(express.json())
server.use(cors())
server.use(UserRouter)
server.use(router)
server.use(helmet())



server.listen(4444)