import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    address: string | string[] | undefined,
    txCount: number,
    balance: number
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { address } = req.query
    res.status(200).json({ address: address, txCount: 0, balance: 2.250312858311 })
  }