require('dotenv').config()

import express from 'express'

import { Auth } from './middlewares/Auth'
import { ClientSignup, ClientSignin, ClientUpdate } from './controllers/Client.controller'

const routes = express.Router()

routes.post('/signup', ClientSignup)
routes.post('/signin', ClientSignin)
routes.put('/client/:id', ClientUpdate)

routes.use(Auth)

export default routes
