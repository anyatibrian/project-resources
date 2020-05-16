import { prisma } from '../index'
/**
 * service responsible for
 *  handling all the authorization
 */
export class AuthService {
  /**
   * @param {*} userInfo
   */
  public static createUser = (userInfo: any) => {
    const newUser = prisma.users.create(userInfo)
    return newUser
  }

  /**
   *
   * @param {*} userdetails
   *
   */

  public static checkUserExist = (userEmail) => {
    const userExist = prisma.users.findOne({
      where:{ email: String(userEmail) },
    })
    return userExist
  }

  /**
   * services for login the users
   * @param {*} username
   * @param {*} password
   */

  public static loginUsers = (email: String | any) => {
    const loginUser = prisma.users.findOne({where:{
      email: String(email),
    }})
    return loginUser
  }

  /**
   * @param {*} id
   * @param {*} newPassword
   */
  public static confirmPassword = (userId: any, newPassword: any) => {
    const currentInfo = prisma.users.update({
      where: { id: userId }
      , data: { password: newPassword },
    })
    return currentInfo
  }

  /**
   * service that activates users acount
   * @param {*} id
   *
   */
  public static activateUserAccount = (id: any) => {
    const activeUser = prisma.users.update({
      where: { id }, data: {
        isActive: true,
      },
    })
    return activeUser
  }

  /**
   *
   *creating users profile
   *
   */

  public static getUserProfile = (id) => {
    return prisma.profiles.findOne({where:{
      userId: Number(id),
    },
      include:{
        users:{
          select:{
            email:true,
            createdAt:true,
            userName:true,
            updatedAt:true,
          },
        },
      },
    })
  }

  /**
   *
   * @param {*} profileInfo
   * @param {*} userId
   *
   */

  public static updateUserProfile = (profileInfo, userId) => {
    const updatedProfile = prisma.profiles.update({
      where:{ userId },
      data:profileInfo,
    })
    return updatedProfile
  }
}
