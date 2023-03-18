declare module 'chia-agent/api/rpc/full_node' {
    export interface CoinRecord {
      coin: {
        name: string;
        parent_coin_info: string;
        puzzle_hash: string;
        amount: number;
        coinbase: boolean;
      };
      confirmed_block_index: number;
      spent_block_index: number | null;
      spent: boolean;
    }
  
    export function get_coin_records_by_puzzle_hash(
      agent: RPCAgent,
      request: {
        puzzle_hash: string;
        include_spent_coins?: boolean;
        start_height?: number;
        end_height?: number;
      }
    ): Promise<{
      coin_records: CoinRecord[];
    }>;
  }
  