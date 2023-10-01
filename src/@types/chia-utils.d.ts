declare module 'chia-utils' {

    // Type for the object returned by the `decode_puzzle_hash` function
    export interface DecodedPuzzleHash {
      prefix: string;
      puzzleHash: string;
      solution: string | null;
    }
  
    /**
     * Decodes a puzzle hash into its prefix, puzzle hash, and solution (if any).
     * @param puzzleHash The puzzle hash to decode.
     * @returns An object containing the prefix, puzzle hash, and solution (if any) of the input puzzle hash.
     */
    export function decode_puzzle_hash(puzzleHash: string): DecodedPuzzleHash;

    export function address_to_puzzle_hash(address: string): string;
    
    export function puzzle_hash_to_address(puzzle_hash: string): string;
  
    /**
     * Encodes a puzzle hash from its prefix, puzzle hash, and solution (if any).
     * @param prefix The prefix of the puzzle hash to encode.
     * @param puzzleHash The puzzle hash to encode.
     * @param solution (optional) The solution of the puzzle hash to encode.
     * @returns The encoded puzzle hash.
     */
    export function encode_puzzle_hash(
      prefix: string,
      puzzleHash: string,
      solution?: string | null
    ): string;
  
    // Type for the object returned by the `decode_coin_id` function
    export interface DecodedCoinID {
      parent_coin_info: string;
      puzzle_hash: string;
      amount: number;
    }
  
    /**
     * Decodes a coin ID into its parent coin ID, puzzle hash, and amount.
     * @param coinID The coin ID to decode.
     * @returns An object containing the parent coin ID, puzzle hash, and amount of the input coin ID.
     */
    export function decode_coin_id(coinID: string): DecodedCoinID;
  
    /**
     * Encodes a coin ID from its parent coin ID, puzzle hash, and amount.
     * @param parentCoinID The parent coin ID of the coin ID to encode.
     * @param puzzleHash The puzzle hash of the coin ID to encode.
     * @param amount The amount of the coin ID to encode.
     * @returns The encoded coin ID.
     */
    export function encode_coin_id(
      parentCoinID: string,
      puzzleHash: string,
      amount: number
    ): string;

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
  }
  