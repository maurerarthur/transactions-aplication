require('dotenv').config()

import express from 'express'
import cors from 'cors'

import { Auth } from './middlewares/Auth'

import {
  ClientSignup,
  ClientSignin,
  ClientUpdate,
  ClientView,
  ClientDelete
} from './core/use-cases/Client/Client.controller'

import {
  TransactionCreate,
  TransactionDelete
} from './core/use-cases/Transaction/Transaction.controller'

const routes = express.Router()

routes.use(cors())

routes.post('/signup', ClientSignup)
routes.post('/signin', ClientSignin)

routes.use(Auth)

routes.get('/client/:id', ClientView)
routes.put('/client/:id', ClientUpdate)
routes.delete('/client/:id', ClientDelete)

routes.post('/transaction/new', TransactionCreate)
routes.delete('/transaction/:id', TransactionDelete)

export default routes
