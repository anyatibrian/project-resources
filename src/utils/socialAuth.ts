import passport from 'passport'
import passportFacebookToken from 'passport-facebook-token'
import passportTwitterToken from 'passport-twitter-token'
import { AuthService } from '../services/Auth.service'

export const passportConfig = () => {
    // facebook strategy
  passport.use('facebook-token', new passportFacebookToken({
    clientID:process.env.FACEBOOK_CLIENT_ID,
    clientSecret:process.env.FACEBOOK_CLIENT_SCECRETE,
    profileFields:['email', 'photos', 'name'],
  }, async(accessToken, refreshToken, profile, done) => {
    const { email, first_name, picture } = profile._json
    const userExist = await AuthService.checkUserExist(email)
    try {
      if (!userExist) {
        const newFacebookuser = await AuthService.createUser({data:{
          email,
          userName: first_name.toLowerCase(),
          isActive:true,
          password:'',
          profiles:{
            create:{
              location:'',
              profileImage: picture.data.url,
              telephoneNo:'',
            },
          },
        }})
        return done(null, newFacebookuser)
      }
    }catch (error) {
      return done(error, profile)
    }
    return done(null, userExist)
  }))
  // twitter authenitcation

  passport.use('twitter-token', new passportTwitterToken({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    profileFields:['email', 'photos', 'name'],
  }, (token, tokenSecret, profile, done) => {
    console.log(profile)
  }))
  // serialize users data
  passport.serializeUser((user, cb) => {
    cb(null, user)
  })
  // deserialize users data
  passport.deserializeUser((obj, cb) => {
    cb(null, obj)
  })
}
