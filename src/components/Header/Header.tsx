import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Search } from "react-feather";
import toast from 'react-hot-toast';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';


function Header() {
    const [searchInput, setSearchInput] = useState('');
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          mainSearch: HTMLInputElement & { blur(): void };
        };
        target.mainSearch.blur(); // Remove mobile keyboard after searching
        if (searchInput.trim()) {
          router.push(`/address/${target.mainSearch.value}`) // Redirect to address page
            .catch(error => {
              toast.error('Failed to redirect to page')
              console.error(error);
            });
        }
        setSearchInput(''); // Reset search input to keep page clean
      };
      

    return (
        <header className="flex justify-center bg-[#FBFDFF] md:px-8 px-4">
            <div className="max-w-[1536px] w-full gap-8 md:gap-12 flex py-8 items-center flex-col md:flex-row">
                <Link href={'/'}>
                    <div className='flex items-center gap-2 hover:opacity-80 transition w-max'>
                        <Image src="/images/chia-logo.png" width={64} height={64} alt="Chia Explorer logo" className='w-16 h-16' />
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