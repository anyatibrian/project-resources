import jsonwebtoken from 'jsonwebtoken'

/**
 *
 * @param details
 *
 */
export const generateToken = (details:any) => {
  const token =  jsonwebtoken.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    id:details.id,
    username:details.username,
  },
  process.env.SECRETE_KEY)
  return token
}
