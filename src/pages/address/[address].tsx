import { DollarSign, Circle } from "react-feather";
import { type GetServerSideProps } from 'next';

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
    }
}

function Address({ addressData, chiaPrice }: AddressPageProps) {

      return (
        <div className="w-full flex justify-center bg-[#FBFDFF] min-h-screen px-8">
            <div className="max-w-[1536px] w-full flex flex-col gap-8">

                <div className='bg-green-600 py-8 px-16 rounded-[2rem]'>
                    <p className='text-white/80 text-2xl font-medium truncate ...'>{addressData.address}</p>
                </div>



                <div className='flex md:flex-row flex-col gap-4'>

                    <div className='rounded-[2rem] bg-white border-slate-200 border p-10 w-full xl:w-1/4 flex items-center gap-4'>
                        <div className='p-4 border border-slate-100 rounded-full text-green-600'>
                            <Circle className='w-8 h-8' />
                        </div>
                        <div>
                            <p className='text-[18px] font-medium'>Balance</p>
                            <p className='font-bold text-2xl'>{addressData.balance + ' XCH'}</p>
                        </div>
                    </div>

                    <div className='rounded-[2rem] bg-white border-slate-200 border p-10 w-full xl:w-1/4 flex items-center gap-4'>
                        <div className='p-4 border border-slate-100 rounded-full text-green-600'>
                            <DollarSign className='w-8 h-8' />
                        </div>
                        <div>
                            <p className='text-[18px] font-medium'>Fiat Value</p>
                            <p className='font-bold text-2xl'>${Math.round((Number(addressData.balance) * chiaPrice.usd + Number.EPSILON) * 100) / 100}</p>
                        </div>
                    </div>

                </div>


            </div>
        </div>
      )
    }

export default Address;


interface AddressData {
    address: string
    txCount: number
    balance: string
    flag: boolean
}

interface ChiaPrice {
    chia: {
        usd: number
        gbp: number
    }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get Address Info
    const address = context.query.address as string;
    let addressData;
    await fetch(`https://www.chia.tt/api/chia/blockchain/address/${address}`)
    .then(res => res.json())
    .then((res: AddressData) => {
        addressData = res;
    })

    // Get Chia Price
    let chiaPrice;
    await fetch('https://api.coingecko.com/api/v3/simple/price?ids=chia&vs_currencies=usd%2Cgbp')
    .then(res => res.json())
    .then((res: ChiaPrice) => {
        chiaPrice = res['chia'];
    })

    return {
        props: {
            addressData,
            chiaPrice
        }
    }
}