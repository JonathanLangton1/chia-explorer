import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { DollarSign } from "react-feather";

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

    //   if (!data) return <p>No address data found</p>

      return (
        <div className="w-full flex justify-center bg-[#FBFDFF] min-h-screen">
            <div className="max-w-[1536px] w-full flex flex-col gap-8">

                <div className='bg-green-600 py-8 px-16 rounded-xl bg-[linear-gradient(to right,rgb(22 163 74),rgba(16,71,52,0.8)),url(https://static-prod.adweek.com/wp-content/uploads/2022/03/datapointsqr.png)] bg-right'>
                    <p className='text-white/80 text-2xl font-medium'>{data ? data.address : '‏'}</p>
                </div>



                <div className='flex gap-4'>

                    <div className='rounded-[2rem] bg-white border-slate-100 border p-10 w-1/4 flex items-center gap-4'>
                        <div className='p-4 border border-slate-100 rounded-full text-green-600'>
                            <DollarSign className='w-8 h-8' />
                        </div>
                        <div>
                            <p className='text-[18px] font-medium'>Balance</p>
                            <p className='font-bold text-2xl'>{data ? data.balance + ' XCH' : '‏'}</p>
                        </div>
                    </div>

                    <div className='rounded-[2rem] bg-white border-slate-100 border p-10 w-1/4 flex items-center gap-4'>
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