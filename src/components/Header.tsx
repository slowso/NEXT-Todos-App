'use client';
import { LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {

    const session = useSession();

    return (
        <div className="h-16 w-full bg-black/90 text-white fixed top-0 flex items-center justify-between py-2 px-4">
            <h1 className='text-2xl font-semibold cursor-pointer select-none' >
                Todo's App
            </h1>
            <h4 className='hidden md:block text-xl text-gray-200 font-semibold select-none' >
                {session?.data?.user?.name}
            </h4>
            {
                session?.status === "authenticated" &&
                <Button
                    onClick={() => signOut()}
                    className='transition-transform hover:text-red-600 active:scale-95'
                >
                    <LogOut />
                </Button>
            }
        </div>
    )
}

export default Header