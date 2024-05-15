"use client";

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

    const pathname = usePathname();

    return (
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 
        p-6 pt-20 text-white max-sm:hidden lg:w-[220px] overflow-hidden'>

            <div className='flex flex-1 flex-col gap-2'>
                {sidebarLinks.map((link) => {

                    const isActive = pathname === link.route;
                    if (link.route !== '/') {   
                        const isActive = pathname === link.route || pathname.startsWith(link.route);
                    }

                    return (
                        <Link
                            href={link.route}
                            key={link.label}
                            className={cn('flex gap-4 items-center p-4 rounded-lg', {
                                'bg-blue-1': isActive
                            })}>
                            <Image src={link.imageUrl} width={16} height={16} alt={link.label} />
                            <p className='text-sm font-semibold max-lg:hidden'>
                                {link.label}
                            </p>
                        </Link>
                    )
                })}
            </div>

            <div>
                hi there
            </div>

        </section>
    )
}

export default Sidebar