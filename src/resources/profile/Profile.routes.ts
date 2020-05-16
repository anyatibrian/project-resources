import { Router } from 'express'
import { UserProfile } from './Profile.controller'
import { AuthMiddleWare } from '../../middleware/Auth.middleware'

export const profileRoutes:Router = Router()

const profile:UserProfile = new UserProfile()

profileRoutes.route('/update')
.all(AuthMiddleWare.checkAuth)
.put(profile.updateUserProfile)
.get()

profileRoutes.route('/')
.all(AuthMiddleWare.checkAuth)
.get(profile.getUserProfile)
