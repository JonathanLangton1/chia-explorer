import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Popover, Transition } from '@headlessui/react'
import { useRouter } from 'next/router';
import { Search, Menu, X } from "react-feather";
import toast from 'react-hot-toast';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';


function Header() {
    const [searchInput, setSearchInput] = useState('');
    const [isShowing, setIsShowing] = useState(false)
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

              {/* Logo */}
                <Link href={'/'}>
                    <div className='flex items-center gap-2 hover:opacity-80 transition w-max'>
                        <Image src="/images/chia-logo.png" width={64} height={64} alt="Chia Explorer logo" className='w-16 h-16' />
                        <p className="leading-6 font-black text-2xl">Chia<br></br>Explorer</p>
                    </div>
                </Link>

                {/* Search */}
                <form onSubmit={handleSubmit} className="w-full relative flex items-center group">
                    <input type="text" onChange={handleChange} value={searchInput} name="mainSearch" id="mainSearch" placeholder="Search by Address / Txn Hash / Block / Token / Domain Name" className="peer bg-slate-200 py-4 pl-16 px-8 rounded-full w-full focus:outline-none focus:ring focus:ring-black/80 transition font-medium placeholder-gray-400/50" />
                    <Search className="absolute left-6 stroke-[4px] text-gray-400 w-5 h-5 group-hover:text-black/80 peer-focus:text-black/80 peer-focus:rotate-90 transition" />
                </form>

                {/* Menu Items */}
                <ul className='font-medium h-full flex items-center'>
                  <li className='h-full transition flex items-center'>
                    <Popover className="relative h-full z-50">
                      <Popover.Button className="focus-visible:outline-none h-full px-4 flex items-center gap-1 hover:opacity-80 transition" onClick={() => setIsShowing((isShowing) => !isShowing)}><Menu /></Popover.Button>
                      <Transition
                        show={isShowing}
                        enter="transition duration-75"
                        enterFrom="opacity-0 translate-y-8"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-8"
                      >
                      <Popover.Panel className="absolute bg-white/90 backdrop-blur-sm -right-4 -top-20 z-50 shadow p-8 rounded-[1rem]">
                        <div className="flex flex-col gap-4 whitespace-nowrap">
                          <div className='flex items-center mb-16'>
                            <X onClick={() => setIsShowing((isShowing) => !isShowing)} className='ml-auto cursor-pointer hover:opacity-80 transition' />
                            <p className='font-medium text-4xl absolute'>Menu</p>
                          </div>

                          <p className='border-b-2 border-dashed pb-2 border-b-black text-lg'>Stats</p>
                          <ul className='pb-4 flex flex-col gap-4'>
                            <li className='w-full'><Link href="/tools/puzzlehashconverter" className='flex hover:bg-gradient-to-r hover:from-green-200 px-4 py-2 rounded-md bg-gradient-to-r from-transparent'>Top Farmers</Link></li>
                            <li className='w-full'><Link href="/tools/puzzlehashconverter" className='flex hover:bg-gradient-to-r hover:from-green-200 px-4 py-2 rounded-md bg-gradient-to-r from-transparent'>Top Accounts</Link></li>
                            <li className='w-full'><Link href="/tools/puzzlehashconverter" className='flex hover:bg-gradient-to-r hover:from-green-200 px-4 py-2 rounded-md bg-gradient-to-r from-transparent'>View Blocks</Link></li>
                            <li className='w-full'><Link href="/tools/puzzlehashconverter" className='flex hover:bg-gradient-to-r hover:from-green-200 px-4 py-2 rounded-md bg-gradient-to-r from-transparent'>View Txns</Link></li>
                          </ul>

                          <p className='border-b-2 border-dashed pb-2 border-b-black text-lg'>Tools</p>
                          <ul>
                            <li><Link href="/tools/puzzlehashconverter" className='hover:bg-gradient-to-r hover:from-green-200 px-4 py-2 rounded-md bg-gradient-to-r from-transparent'>Puzzle Hash Converter</Link></li>
                          </ul>
                        </div>
                      </Popover.Panel>
                      </Transition>
                    </Popover>
                  </li>
                </ul>

            </div>

        </header>
     );
}

export default Header;