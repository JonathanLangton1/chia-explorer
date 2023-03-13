import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { DollarSign, Loader } from "react-feather";

function Address() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const router = useRouter()
  const { address } = router.query

//   useEffect(() => {
//     setLoading(true)
//     fetch(`/api/address/${address}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data)
//         setLoading(false)
//       })
//   }, [])

    

    useEffect(() => {
        setLoading(true)

        if(router.isReady) {
            fetch(`https://www.chia.tt/api/chia/blockchain/address/${address}`)
              .then((res) => res.json())
              .then((data) => {
                setData(data)
                setLoading(false)
              })
        }
      }, [router.isReady, router.asPath])

      if (isLoading) return (
        <div className='px-8 flex justify-center mt-16'>
            {/* <Loader className='animate-spin text-gray-400' /> */}
            <img src="https://i.ibb.co/SQg33X7/community-Icon-a91zo8ahaz471-removebg-preview.png" alt="Chia Explorer logo" className='w-16 h-16 animate-pulse grayscale' />
        </div>
      )

      return (
        <div className="w-full flex justify-center bg-[#FBFDFF] min-h-screen px-8">
            <div className="max-w-[1536px] w-full flex flex-col gap-8">

                <div className='bg-green-600 py-8 px-16 rounded-[2rem]'>
                    <p className='text-white/80 text-2xl font-medium'>{data ? data.address : '‏'}</p>
                </div>



                <div className='flex md:flex-row flex-col gap-4'>

                    <div className='rounded-[2rem] bg-white border-slate-200 border p-10 w-full xl:w-1/4 flex items-center gap-4'>
                        <div className='p-4 border border-slate-100 rounded-full text-green-600'>
                            <DollarSign className='w-8 h-8' />
                        </div>
                        <div>
                            <p className='text-[18px] font-medium'>Balance</p>
                            <p className='font-bold text-2xl'>{data ? data.balance + ' XCH' : '‏'}</p>
                        </div>
                    </div>

                    <div className='rounded-[2rem] bg-white border-slate-200 border p-10 w-full xl:w-1/4 flex items-center gap-4'>
                        <div className='p-4 border border-slate-100 rounded-full text-green-600'>
                            <DollarSign className='w-8 h-8' />
                        </div>
                        <div>
                            <p className='text-[18px] font-medium'>Fiat Value</p>
                            <p className='font-bold text-2xl'>$1,321.24</p>
                        </div>
                    </div>

                </div>


            </div>
        </div>
      )
    }

export default Address;