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
} from './core/controllers/Client.controller'

import {
  TransactionView,
  TransactionViewAll,
  TransactionCreate,
  TransactionUpdate,
  TransactionDelete,
  TransactionResume
} from './core/controllers/Transaction.controller'

const routes = express.Router()

routes.use(cors())

routes.post('/signup', ClientSignup)
routes.post('/signin', ClientSignin)

routes.get('/client/:clientId', Auth, ClientView)
routes.put('/client/:clientId', Auth, ClientUpdate)
routes.delete('/client/:clientId', Auth, ClientDelete)

routes.get('/client/:clientId/transaction/resume', Auth, TransactionResume)
routes.get('/client/:clientId/transaction', Auth, TransactionViewAll)
routes.get('/client/:clientId/transaction/:id', Auth, TransactionView)
routes.post('/client/:clientId/transaction', Auth, TransactionCreate)
routes.put('/client/:clientId/transaction/:id', Auth, TransactionUpdate)
routes.delete('/client/:clientId/transaction/:id', Auth, TransactionDelete)

export default routes
