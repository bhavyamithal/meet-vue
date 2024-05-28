"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"


const MobileNav = () => {
    const pathname = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Image className="cursor-pointer sm:hidden" src={'/icons/hamburger.svg'} width={36} height={36} alt="View More Options" />
                </SheetTrigger>
                <SheetContent side={"left"} className="border-none bg-dark-1" >
                    <SheetClose asChild>
                        <Link href='/home' className='flex items-center gap-1'>
                            <Image src={'/icons/logo.svg'} width={40} height={40} alt='MeetVue' className='max-sm:size-10' />
                            <p className='px-3 text-xl font-extrabold text-white max-sm:hidden'>MeetVue</p>
                        </Link>
                    </SheetClose>

                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <SheetClose asChild>
                            <section className="flex h-full flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map((link) => {

                                    const isActive = pathname === link.route;
                                    if (link.route !== '/') {
                                        const isActive = pathname === link.route || pathname.startsWith(link.route);
                                    }

                                    return (
                                        <SheetClose asChild key={link.route}>

                                            <Link
                                                href={link.route}
                                                key={link.label}
                                                className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                                                    'bg-blue-1': isActive
                                                })}>
                                                <Image src={link.imageUrl} width={16} height={16} alt={link.label} />
                                                <p className='text-sm font-semibold'>
                                                    {link.label}
                                                </p>
                                            </Link>

                                        </SheetClose>
                                    )
                                })}
                            </section>
                        </SheetClose>
                    </div>

                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav