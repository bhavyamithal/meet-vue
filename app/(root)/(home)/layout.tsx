import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next';
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
        <main className='relative'>
            <Navbar />

            <div className='flex'>
                <Sidebar />

                <section className='flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px14'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section>

            </div>

            Footer
        </main>
    )
}

export default HomeLayout