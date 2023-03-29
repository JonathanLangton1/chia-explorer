import FormattedNumber from '~/components/FormattedNumber/FormattedNumber';
import { type GetStaticProps, type GetStaticPaths } from 'next';
import { type ParsedUrlQuery } from 'querystring'
import utc from "dayjs/plugin/relativeTime";
import { useRouter } from 'next/router'
import { env } from "~/env.mjs";
import dayjs from "dayjs";


// Add plugin for dayjs
dayjs.extend(utc);

interface props {
    blockData: {
        block_record: {
            challenge_block_info_hash: string
            timestamp: number
            farmer_puzzle_hash: string
            pool_puzzle_hash: string
            fees: number
        }
    }
}

function Block({ blockData }: props) {
    
    const router = useRouter()
    const { block } = router.query

    return (
        <div className="w-full flex justify-center bg-[#FBFDFF] min-h-screen md:px-8 px-4">
            <div className="max-w-[1536px] w-full flex flex-col gap-8">

            {/* Block number header */}
            <div className="flex items-center py-4 px-16 rounded-[1rem] gap-2 bg-gradient-to-r from-green-200">
                    <p className='text-xl font-medium truncate ... pb-1 font-mono' >Block <span className="font-bold">#<FormattedNumber number={Number(block)} /></span></p>
            </div>

            {/* Data table containing block information */}
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Block Height</td>
                            <td><FormattedNumber number={Number(block)} /></td>
                        </tr>
                        <tr>
                            <td>Header Hash</td>
                            <td>{blockData.block_record.challenge_block_info_hash}</td>
                        </tr>
                        <tr>
                            <td>Timestamp</td>
                            <td>{dayjs(new Date( blockData.block_record.timestamp * 1000)).fromNow()} ({dayjs(new Date( blockData.block_record.timestamp * 1000)).format('MMMM D, YYYY h:mm:ss A')}) UTC</td>
                        </tr>
                        <tr>
                            <td>Transactions</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Farmer</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Farmer Puzzlehash</td>
                            <td>{blockData.block_record.farmer_puzzle_hash}</td>
                        </tr>
                        <tr>
                            <td>Pool</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Pool Puzzlehash</td>
                            <td>{blockData.block_record.pool_puzzle_hash}</td>
                        </tr>
                        <tr>
                            <td>Pool Reward</td>
                            <td>1.75 XCH</td>
                        </tr>
                        <tr>
                            <td>Farmer Reward</td>
                            <td>0.25 XCH</td>
                        </tr>
                        <tr>
                            <td>Fees</td>
                            <td>{blockData.block_record.fees/1000000000000} XCH</td>
                        </tr>
                    </tbody>
                </table>
            </div>


            </div>
        </div>
    )  
}

export default Block

// Server code
export const getStaticPaths: GetStaticPaths = () => {
    return {
      paths: [],
      fallback: 'blocking'
    };
};   

interface IParams extends ParsedUrlQuery {
    slug: string
}

export const getStaticProps: GetStaticProps = async (context) => {

    // Get block number from router (dynamic page)
    const { block } = context.params as IParams;

    // Get block data from node
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    // Add puzzle hash to request
    const raw = JSON.stringify({
     "height": block
    });
    
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: raw,
    };

    const res = await fetch(`https://kraken.fireacademy.io/${env.FIREACADEMY_API_KEY}/leaflet/get_block_record_by_height`, requestOptions)
    const blockData = await res.json() as props["blockData"]
    return { props: {blockData: blockData} }
}