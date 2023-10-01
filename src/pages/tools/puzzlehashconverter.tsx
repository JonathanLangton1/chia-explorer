import { Repeat } from "react-feather"
import * as React from 'react';
import { useState, useEffect } from 'react';


const PuzzleHashConverter = () => {
    const [address, setAddress] = useState('')
    const [puzzleHash, setPuzzleHash] = useState('')

    const handleAddressInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(target.value)
    }

    const handlePuzzleHashInput = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setPuzzleHash(target.value)
    }
    // Generate Puzzle hash
    useEffect(() => {
        const fetchData = async () => {
            if (/xch1[qpzry9x8gf2tvdw0s3jn54khce6mua7l]{57}/i.test(address)) {
                try {
                    const response = await fetch(`/api/tools/addresstopuzzlehash?address=${address}`);
                    const data = await response.json() as { puzzle_hash: string };
                    setPuzzleHash(data['puzzle_hash']);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        }

        void fetchData();
    }, [address]);

    // Generate Address
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (/0x[a-fA-F0-9]{64}/.test(puzzleHash)) {
                    const response = await fetch(`/api/tools/puzzlehashtoaddress?puzzle_hash=${puzzleHash}`);
                    const data = await response.json() as { address: string };
                    setAddress(data.address);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        void fetchData();
    }, [puzzleHash]);

    return (
        <div className="w-full flex justify-center bg-[#FBFDFF] min-h-screen md:px-8 px-4">
            <div className="max-w-[1536px] w-full flex flex-col gap-8">

                <h1 className="font-medium text-2xl pt-8">Chia Address & Puzzle Hash Converter</h1>
                <div className="rounded-[2rem] bg-gradient-to-b from-green-400 to-green-600 shadow-lg p-8 py-16 flex gap-8 flex-col justify-center items-center xl:flex-row">

                    <div className="relative flex items-center w-full">
                        <input value={address} onInput={handleAddressInput} type="text" name="address" placeholder=" " id="address" className="peer shadow-inner backdrop-blur w-full text-xl text-white rounded-full py-8 px-8 pl-20 bg-green-700/80 placeholder-white/50 focus:outline-none focus:ring focus:ring-white/80 transition" />
                        <label htmlFor="address" className="absolute transition z-[1] text-white/50 text-xl left-16 origin-[0] -translate-y-12 cursor-text peer-focus:text-white peer-placeholder-shown:border-transparent peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-12 peer-focus:bg-white/10 backdrop-blur rounded-full px-4 py-1 peer-focus:shadow-lg border-2 peer-focus:border-2 peer-focus:border-white">Address</label>
                    </div>
                    <div className="flex justify-center items-center py-4">
                        <Repeat className="text-white w-12 h-12" />
                    </div>
                    <div className="relative flex items-center w-full">
                        <input value={puzzleHash} onInput={handlePuzzleHashInput} type="text" name="puzzleHash" placeholder=" " id="puzzleHash" className="peer shadow-inner backdrop-blur w-full text-xl text-white rounded-full py-8 px-8 pl-20 bg-green-700/80 placeholder-white/50 focus:outline-none focus:ring focus:ring-white/80 transition" />
                        <label htmlFor="puzzleHash" className="absolute transition z-[1] text-white/50 text-xl left-16 origin-[0] -translate-y-12 cursor-text peer-focus:text-white peer-placeholder-shown:border-transparent peer-placeholder-shown:translate-y-0 peer-focus:scale-100 peer-focus:-translate-y-12 peer-focus:bg-white/10 backdrop-blur rounded-full px-4 py-1 peer-focus:shadow-lg border-2 peer-focus:border-2 peer-focus:border-white">Puzzle Hash</label>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PuzzleHashConverter;