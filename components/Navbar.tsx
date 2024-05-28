import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/home' className='flex items-center gap-1'>
        <Image src={'/icons/logo.svg'} width={40} height={40} alt='MeetVue' className='max-sm:size-10' />
        <p className='px-3 text-xl font-extrabold text-white max-sm:hidden'>MeetVue</p>
      </Link>
      <div className='flex-between gap-5'>

        <SignedIn>
          <UserButton />
        </SignedIn>
        {/* {Cleck auth} */}
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar