import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../../services/Auth.service';
import { hashPassword } from '../../utils/hashPassword';
import { compareHashedPassword } from '../../utils/compareHashed';
import { generateToken } from '../../utils/generateJWT';
import { sendMailEvent, createProfileEvent } from '../../utils/event.handlers';
import { decodeJWToken } from '../../utils/decodeToken';
/**
 * users controller that handles
 *  various users method
 */
export class UserController {
  /**
   * controller that handles creation of users
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const {
      body: { username, email, password },
      protocol,
      headers: { host },
    } = req;
    const hashedPassword: String | any = await hashPassword(password);
    try {
      const user: any = await AuthService.createUser({
        data:
        {
          email,
          userName: username,
          password: hashedPassword,
          profiles: {
            create: {
              profileImage: '',
              location: '',
              telephoneNo: '',
            },
          },
        },
      })
      if (user) {
        const token = await generateToken(user);
        const mailinfo = {
          host,
          protocol,
          email,
          username,
          token,
          textOne: 'account',
          textTwo: 'activation',
          messageBody: 'Thanks for registering onto our phlaform click the button below to activate your account',
          activate: 'Activate account',
          subject: 'account activation',
        };

        /**
         * making call to the sendmail  and createprofile event eventhandler
         */

        sendMailEvent.emit('sendMail', mailinfo);
        return res.status(201).json({
          message:
            'users has been created successfully check your email for activation link',
          userinfo: user,
        });
      }
    } catch (error) {
      error.status = 500
      error.message = 'an error occured while changing your password'
    }
  };

  /**
   * controller that logs the users in
   * @param {*} req
   * @param {*} res
   * @param {*} next
   *
   */

  public loginUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const { email, password } = req.body;
    try {
      const users = await AuthService.loginUsers(email);
      if (users.isActive) {
        await compareHashedPassword(password, users.password);
        const userToken = await generateToken(users);
        return res.status(200).json({
          message: 'your are welcome thanks for login',
          auth_token: userToken,
        });
      }
      return res.status(400).json({
        error: 'username or password does not exist|or your account is in active ',
      });
    } catch (error) {
      error.status = 500
      error.message = 'an error occured while changing your password'
      res.status(500).send(error)
    }
  };

  /**
   *
   * controller method that sends password resetlink
   * @param {*} req
   * @param {*} res
   * @param {*} next
   *
   */
  public sendPasswordResetLink = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const {
      body: { email },
      headers: { host },
      protocol,
    }: any = req;
    try {
      const userEmail = await AuthService.checkUserExist(email);
      const resetToken = generateToken(userEmail);
      const mailinfo = {
        host,
        protocol,
        email: userEmail.email,
        username: userEmail.userName,
        textOne: 'password',
        token: resetToken,
        textTwo: 'reset',
        messageBody: 'your are recieving this mail because you requested to reset your password, click the link below',
        activate: 'Reset Password',
        subject: 'Password Resest',
      };
      sendMailEvent.emit('sendMail', mailinfo);
      return res.status(200).send({
        message: `${userEmail.userName} an activation link has been sent to your email`,
      });

    } catch (error) {
      error.status = 500
      error.message = 'an error occured while changing your password'
      res.status(500).send(error)
    }
  };

  // /**
  //  *
  //  * controller method the handles password reseting
  //  * @param {*} req
  //  * @param {*} res
  //  * @param {*} next
  //  *
  //  */

  public confirmPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const {
      body: { password },
      params: { token },
    } = req;
    try {
      const decodedToken = await decodeJWToken(token);
      const updateUser = await AuthService.confirmPassword(
        decodedToken.id,
        await hashPassword(password),
      );
      if (updateUser) {
        return res.status(200).send({
          message: 'your password was updated successfully',
        });
      }
    } catch (error) {
      error.status = 500,
        error.message = 'an error occured while changing your password'
      res.status(500).send(error)
    }
  };

  /**
   *
   * controller method the handles password reseting
   * @param {*} req
   * @param {*} res
   * @param {*} next
   *
   */
  public acountActivation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const { token } = req.params;
    const userId: any = await decodeJWToken(token);
    try {
      await AuthService.activateUserAccount(userId.id);
      return res.status(200).send({
        message: 'your account was activated successfully',
      });
    } catch (error) {
      (error.status = 500),
        (error.message = 'an error occured while changing your password');
      res.status(500).send(error);
    }
  };
}
