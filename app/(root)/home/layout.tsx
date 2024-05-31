import Footer from '@/components/Footer';
import { LandingNavBar } from '@/components/LandingNavBar';
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
  title: "MeetVue",
  description: "Practice Mock Interviews with your peers",
  icons: {
    icon: '/icons/logo.svg'
  }
};

// this is new

const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className='relative overflow-hidden'>
            <div className='w-screen flex items-center bg-black bg-opacity-50 justify-between text-neutral-200 p-2 px-14'>
                <div className=''>
                    <Link href={'/home'} className="flex gap-2 relative z-30">
                        <Image src={"/icons/logo.svg"} width={24} height={24} alt="MeetVue" />
                        <h2 className="font-bold">MeetVue</h2>
                    </Link>
                </div>
                <LandingNavBar />
            </div>

            <div className='flex'>
                {/* <Sidebar /> */}

                <section className='flex min-h-screen flex-1 flex-col bg-gradient-to-b from-transparent to-black'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section>

            </div>

            <Footer />
        </main>
    )
}

export default HomeLayout