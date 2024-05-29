import { LandingNavBar } from '@/components/LandingNavBar';
import Image from 'next/image';
import Link from 'next/link';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='overflow-hidden '>
            <div className='w-screen flex items-center bg-black bg-opacity-50 justify-between text-neutral-200 p-2 px-14'>
                <div className=''>
                    <Link href={'/'} className="flex gap-2 relative z-30">
                        <Image src={"/icons/logo.svg"} width={24} height={24} alt="MeetVue" />
                        <h2 className="font-bold">MeetVue</h2>
                    </Link>
                </div>
                <LandingNavBar />
            </div>
            {children}
        </div>
    )
}

export default Layout