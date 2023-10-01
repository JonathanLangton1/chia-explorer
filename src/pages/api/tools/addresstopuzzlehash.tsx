import type { NextApiRequest, NextApiResponse } from 'next'
import { address_to_puzzle_hash } from "chia-utils";


type Data = {
    puzzle_hash: string,
  }

  export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { address }: { address: string } = req.query as { address: string };

        if (!address) {
            throw new Error("Address is missing");
        }

        const puzzle_hash = address_to_puzzle_hash(address);
        res.status(200).json({ puzzle_hash });
    } catch (error) {
        res.status(422).json({ puzzle_hash: '' });
    }
}
