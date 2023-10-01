import type { NextApiRequest, NextApiResponse } from 'next'
import { puzzle_hash_to_address } from 'chia-utils';


type Data = {
    address: string,
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { puzzle_hash }: { puzzle_hash: string } = req.query as { puzzle_hash: string };

        if (!puzzle_hash) {
            throw new Error("Puzzle hash is missing");
        }

        const address: string = puzzle_hash_to_address(puzzle_hash);

        res.status(200).json({ address });
    } catch (error) {
        res.status(422).json({ address: '' });
    }
}
