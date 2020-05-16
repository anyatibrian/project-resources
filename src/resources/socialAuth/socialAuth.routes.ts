import { Router } from 'express'
import passport from 'passport'
import { passportConfig } from '../../utils/socialAuth'
import { SocialAuth } from './socialAuth.controlers'

passportConfig()
const socialAuth:SocialAuth = new SocialAuth()
export const socialRouter:Router = Router()

socialRouter.route('/facebook')
.all()
.post(passport.authenticate('facebook-token', { session:false }),
socialAuth.facebookSocialAuth)

socialRouter.route('/twitter')
.all()
.post(passport.authenticate('twitter-token', { session:false }),
socialAuth.twitterSocialAuth)
