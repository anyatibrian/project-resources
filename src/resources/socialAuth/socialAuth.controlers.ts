import { Request, Response, NextFunction } from 'express'
import { generateToken } from '../../utils/generateJWT'
export class SocialAuth {

  /**
   * social authentication with facebook
   */
  facebookSocialAuth = async(
      req:Request,
      res:Response,
      next:NextFunction):Promise<any> => {
    const { user:{ id, userName } }:any = req
    const token = generateToken({ id, username: userName })
    return res.status(200).send({
      message:'your login sucessfully',
      access_token: token,
    })
  }
  /**
   * social authentication with twitter
   *
   */

  twitterSocialAuth = async(
    req:Request,
    res:Response,
    next:NextFunction):Promise<any> => {
    console.log(req.user)
  }
}
