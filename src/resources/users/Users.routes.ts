import { Router } from 'express'
import { UserController } from './Users.controller'
import { AuthMiddleWare } from '../../middleware/Auth.middleware'

// creating the user Routes
export const userRoutes:Router = Router()
const users:UserController =  new UserController()

userRoutes.route('/register')
.all()
.post(AuthMiddleWare.checkUserExist, users.createUser)

userRoutes.route('/login')
.all()
.post(users.loginUsers)

userRoutes.route('/forgot/password')
.all()
.post(users.sendPasswordResetLink)

userRoutes.route('/password/:token/reset')
.all()
.put(users.confirmPassword)

userRoutes.route('/account/:token/activation')
.all()
.put(users.acountActivation)
