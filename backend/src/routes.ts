require('dotenv').config()

import express from 'express'

import { Auth } from './middlewares/Auth'

import {
  ClientSignup,
  ClientSignin,
  ClientUpdate,
  ClientView,
  ClientDelete
} from './controllers/Client.controller'

import { CreateTransaction } from './controllers/Transaction.controller'

const routes = express.Router()

routes.post('/signup', ClientSignup)
routes.post('/signin', ClientSignin)

routes.use(Auth)

routes.get('/client/:id', ClientView)
routes.put('/client/:id', ClientUpdate)
routes.delete('/client/:id', ClientDelete)

routes.post('/transaction/new', CreateTransaction)

export default routes
