import bcrypt from 'bcrypt'

/**
 * function used for hashing passwords
 * @param saltRounds
 * @param password
 */
export const hashPassword = async (password:string|any):Promise<any> => {
  const saltRounds:number = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  return await bcrypt.hashSync(password, salt)
}
