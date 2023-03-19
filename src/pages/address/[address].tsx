import { get_coin_records_by_puzzle_hash } from "chia-agent/api/rpc/full_node";
import { type GetStaticProps, type GetStaticPaths } from 'next';
import { DollarSign, Circle, Copy } from "react-feather";
import relativeTime from "dayjs/plugin/relativeTime";
import { address_to_puzzle_hash } from "chia-utils";
import 'react-tooltip/dist/react-tooltip.css';
import Table from "~/components/Table/Table";
import { Tooltip } from 'react-tooltip';
import { RPCAgent } from "chia-agent";
import toast from 'react-hot-toast';
import { useMemo } from 'react';
import { env } from "~/env.mjs";
import Link from "next/link";
import dayjs from "dayjs";


// Add plugin for dayjs
dayjs.extend(relativeTime);

interface AddressPageProps {
    addressData: {
        address: string
        txCount: number
        balance: string
        flag: boolean
    },
    chiaPrice: {
        usd: number
        gbp: number
    },
    balance: number,
    transactions: []
}

function Address({ addressData, chiaPrice, balance, transactions }: AddressPageProps) {
    // Transaction data
    const columns = useMemo(
        () => [
            {
              header: 'TXN HASH',
              accessorKey: 'txnHash',
              cell: (props: {getValue: () => string}) => <Link href={`/transaction/${props.getValue()}`} className="text-green-600">{props.getValue().slice(0, 6).toString() + '...' + props.getValue().slice(-4).toString()}</Link>
            },
            {
              header: 'TYPE',
              accessorKey: 'type',
            },
            {
              header: 'AGE',
              accessorKey: 'age',
              cell: (props: {getValue: () => number}) => <span>{dayjs(new Date( props.getValue() *1000)).fromNow()}</span>
            //   cell: (props: {getValue: () => number}) => <span data-tooltip-id="my-tooltip" data-tooltip-content={dayjs(new Date( props.getValue() *1000)).format('DD/MM/YYYY HH:mm:ss')}>{dayjs(new Date( props.getValue() *1000)).fromNow()}<Tooltip id="my-tooltip" style={{ borderRadius: '0.5rem' }} /></span>
            },
            {
              header: 'BLOCK',
              accessorKey: 'block',
              cell: (props: {getValue: () => number}) => <Link href={`/block/${props.getValue()}`} className="text-green-600">{props.getValue().toLocaleString()}</Link>
            },
            {
              header: 'FROM',
              accessorKey: 'from',
              cell: (props: {getValue: () => string}) => addressData.address != props.getValue() ? <Link href={`/address/${props.getValue()}`} className="text-green-600">{props.getValue().slice(0, 6).toString() + '...' + props.getValue().slice(-4).toString()}</Link> : props.getValue().slice(0, 6).toString() + '...' + props.getValue().slice(-4).toString()
            },
            {
              header: '',
              accessorKey: 'direction',
              cell: (props: {getValue: () => string}) => <div className={`text-xs py-2 rounded-md w-12 flex font-bold justify-center items-center ${props.getValue() === 'IN' ? 'bg-green-200 text-green-600': 'bg-amber-100 text-amber-600'}`}>{props.getValue()}</div>
            },
            {
              header: 'TO',
              accessorKey: 'to',
              cell: (props: {getValue: () => string}) => addressData.address != props.getValue() ? <Link href={`/address/${props.getValue()}`} className="text-green-600">{props.getValue().slice(0, 6).toString() + '...' + props.getValue().slice(-4).toString()}</Link> : props.getValue().slice(0, 6).toString() + '...' + props.getValue().slice(-4).toString()
            },
            {
              header: 'VALUE',
              accessorKey: 'value',
            },
        ],
        [addressData.address]
    )
    interface Transaction {
        coin: {
            amount: number
            parent_coin_info: string
            puzzle_hash: string
        }
        coinbase: boolean
        confirmed_block_index: number
        spent: boolean
        spent_block_index: number
        timestamp: number
    }

      const data = useMemo(
        () => transactions.map((transaction: Transaction) => (
            {
                txnHash: transaction.coin.parent_coin_info,
                type: 'Farmer Reward',
                age: transaction.timestamp,
                block: transaction.confirmed_block_index,
                from: String(transaction.confirmed_block_index).charAt(0) === '1' ? 'xch1f0ryxk6qn096hefcwrdwpuph2hm24w69jnzezhkfswk0z2jar7aq5zzpfj' : 'xch1gfp4u27zc76v2hpx4kkp6f53luw6qnyy0s8r6d9x5edr2sfle32qvrwlr7',
                direction: String(transaction.confirmed_block_index).charAt(0) === '1' ? 'OUT' : 'IN',
                to: String(transaction.confirmed_block_index).charAt(0) !== '1' ? 'xch1f0ryxk6qn096hefcwrdwpuph2hm24w69jnzezhkfswk0z2jar7aq5zzpfj' : 'xch1gfp4u27zc76v2hpx4kkp6f53luw6qnyy0s8r6d9x5edr2sfle32qvrwlr7',
                value: transaction.coin.amount/1000000000000
            }
        )),
        [transactions]
      )

      const copyAddress = async () => {
        try {
            await navigator.clipboard.writeText(addressData.address);
            toast.success('Copied address')
          } catch (err) {
            toast.error('Failed to copy address')
          }
      }

      return (
        <div className="w-full flex justify-center bg-[#FBFDFF] min-h-screen px-8">
            <div className="max-w-[1536px] w-full flex flex-col gap-8">

                <div className='bg-green-600 py-8 px-16 rounded-[2rem] flex items-center gap-4'>
                    <Copy onClick={() => void copyAddress()} className="text-white opacity-60 min-w-max w-5 h-5 mt-2 cursor-pointer hover:opacity-100 transition" />
                    <p className='text-white/80 text-2xl font-medium truncate ...'>{addressData.address}</p>
                </div>



                <div className='flex md:flex-row flex-col gap-4'>

                    {/* Wallet Balance */}
                    <div className='rounded-[2rem] bg-white border-slate-200 border p-10 w-full xl:w-1/3 flex items-center gap-4'>
                        <div className='p-4 border border-slate-100 rounded-full text-green-600'>
                            <Circle className='w-8 h-8' />
                        </div>
                        <div>
                            <p className='text-[18px] font-medium'>Balance</p>
                            <p className='font-bold text-2xl'>{balance.toLocaleString() + ' XCH'}</p>
                        </div>
                    </div>

                    {/* Fiat Value */}
                    <div className='rounded-[2rem] bg-white border-slate-200 border p-10 w-full xl:w-1/3 flex items-center gap-4'>
                        <div className='p-4 border border-slate-100 rounded-full text-green-600'>
                            <DollarSign className='w-8 h-8' />
                        </div>
                        <div>
                            <p className='text-[18px] font-medium'>Fiat Value</p>
                            <p className='font-bold text-2xl'>${(Math.round((balance * chiaPrice.usd + Number.EPSILON) * 100) / 100).toLocaleString()}</p>
                        </div>
                    </div>

                </div>
                
                {/* Transaction Table */}
                <div className="overflow-x-auto bg-white p-8 rounded-[2rem] border-slate-200 border">
                <Table {...{data, columns}} />
                </div>


            </div>
        </div>
      )
    }

export default Address;


// Server code
export const getStaticPaths: GetStaticPaths = () => {
    return {
      paths: [],
      fallback: 'blocking'
    };
  };   

export const getStaticProps: GetStaticProps = async (context) => {
    // Get address
    const address = context.params?.address as string;

    // Get balance & transactions
    const agent = new RPCAgent({
        protocol: "https",
        host: env.CHIA_NODE_HOST,
        port: 8555,
        ca_cert: undefined,
        client_cert: env.CHIA_RPC_PRIVATE_DAEMON_CRT.replace(/\\n/g, '\n'),
        client_key: env.CHIA_RPC_PRIVATE_DAEMON_KEY.replace(/\\n/g, '\n'),
        skip_hostname_verification: true,
    });

    let balance;
    let transactions
    try {
        const puzzleHash: string = address_to_puzzle_hash(address);
        // const puzzleHash: string = convertAddressToPuzzleHash(address);
        const res = await get_coin_records_by_puzzle_hash(agent, {
            puzzle_hash: puzzleHash,
            include_spent_coins: false,
        });

        balance = (res as {coin_records: []})['coin_records'].reduce((accum, curr) => accum + (curr['coin']['amount']/1000000000000), 0)
        transactions = (res as {coin_records: []})['coin_records']
    } catch {
        balance = 0;
    }


    // let addressData;
    // await fetch(`https://www.chia.tt/api/chia/blockchain/address/${address}`)
    // .then(res => res.json())
    // .then((res: AddressData) => {
    //     addressData = res;
    // })
    const addressData = {
        address: address,
        txCount: 1,
        balance: "2.334345",
        flag: false
    }

    // Get Chia Price
    // let chiaPrice;
    // await fetch('https://api.coingecko.com/api/v3/simple/price?ids=chia&vs_currencies=usd%2Cgbp')
    // .then(res => res.json())
    // .then((res: ChiaPrice) => {
    //     chiaPrice = res['chia'];
    // })

    const chiaPrice = {
        usd: 38.69,
        gbp: 31.77
    }

    return {
        props: {
            addressData,
            chiaPrice,
            balance,
            transactions
        }
    }
}