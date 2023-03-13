import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import { Search } from "react-feather";


function Header() {
    const [searchInput, setSearchInput] = useState();
    const router = useRouter();

    const handleChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.target.mainSearch.blur() // Remove mobile keyboard after searching
        router.push(`/address/${e.target.mainSearch.value}`, `/address/${e.target.mainSearch.value}`) // Redirect to address page
        setSearchInput('') // Reset search input to keep page clean
    }

    return (
        <header className="flex justify-center bg-[#FBFDFF] px-8">
            <div className="max-w-[1536px] w-full gap-8 md:gap-12 flex py-8 items-center flex-col md:flex-row">
                <Link href={'/'}>
                    <div className='flex items-center gap-2 hover:opacity-80 transition w-max'>
                        <img src="https://i.ibb.co/SQg33X7/community-Icon-a91zo8ahaz471-removebg-preview.png" alt="Chia Explorer logo" className='w-16 h-16' />
                        <p className="leading-6 font-black text-2xl">Chia<br></br>Explorer</p>
                    </div>
                </Link>
                <form onSubmit={handleSubmit} className="w-full relative flex items-center group">
                    <input type="text" onChange={handleChange} value={searchInput} name="mainSearch" id="mainSearch" placeholder="Search by Address / Txn Hash / Block / Token / Domain Name" className="peer bg-slate-200 py-4 pl-16 px-8 rounded-full w-full focus:outline-none focus:ring focus:ring-black/80 transition font-medium placeholder-gray-400/50" />
                    <Search className="absolute left-6 stroke-[4px] text-gray-400 w-5 h-5 group-hover:text-black/80 peer-focus:text-black/80 peer-focus:rotate-90 transition" />
                </form>
            </div>
        </header>
     );
}

export default Header;