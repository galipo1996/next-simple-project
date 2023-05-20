import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export const methodFN = (method: string[], handler: NextApiHandler) => {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (!req.method || !method.includes(req.method)) {
      return res.status(405).end()
    }
    return handler(req, res)
  }
}
