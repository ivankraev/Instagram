import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('log from the handler', req.body)
  res.status(200).json(req.body)
}
