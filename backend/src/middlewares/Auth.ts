import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export const Auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization
  const { clientId } = req.params

  if(!token) {
    return res.status(401).send({
      error: true,
      message: 'A token was not found in the request header.'
    })
  }

  try {
    const decoded: any = verify(token, process.env.JWT_SECRET!.toString())

    if(clientId !== decoded.id) {
      return res.status(401).send({
        error: true,
        message: 'Error on authentication.'
      })
    }

    if(decoded) {
      return next()
    }

    return res.status(401).send({
      error: true,
      message: 'The token is invalid.'
    })
  } catch (_) {
    return res.status(401).send({
      error: true,
      message: 'Error on authentication.'
    })
  }
}