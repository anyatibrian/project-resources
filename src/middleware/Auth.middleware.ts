import { Response, Request, NextFunction } from 'express'
import { AuthService } from '../services/Auth.service'
import { decodeJWToken } from '../utils/decodeToken'
export class AuthMiddleWare {
    /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     *
     */
  public static checkUserExist = async (
      req:Request,
      res:Response,
      next:NextFunction): Promise<any> => {
    const { email } = req.body
    const userExist = await AuthService.checkUserExist(email)
    if (userExist) {
      return res.status(200).json({
        message:`user with this ${email} already exist `,
      })
    }
    next()
  }

 /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     *
     */
  public static checkAuth =  async(
     req:Request,
     res:Response,
     next:NextFunction) :Promise<any> => {
    const { authorization } = req.headers
    try {
      if (authorization) {
        await decodeJWToken(authorization.slice(7))
      }else {
        return res.status(401).send({
          error: 'your are unauthorized, please login',
        })
      }
    } catch (error) {
      return res.status(500).send({
        status: 500,
        errorMessage:error,
      })
    }
    next()
  }
}
