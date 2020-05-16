import jsonwebtoken from 'jsonwebtoken'

export const decodeJWToken = async (token:any):Promise<any> => {

  const decodedToken  =  await jsonwebtoken.verify(token, process.env.SECRETE_KEY)
  return decodedToken
}
