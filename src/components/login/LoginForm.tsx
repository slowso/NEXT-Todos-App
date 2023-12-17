'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';

const LoginForm = () => {

    const serachParams = useSearchParams();
    const { status } = useSession();
    const router = useRouter();
    const [data, setData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === 'authenticated') {
            return router.push('/');
        }
    }, [status]);

    const handleLoginClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await signIn('credentials', {
                ...data,
                redirect: false
            })
            setLoading(false)
            if (response?.ok) {
                toast({
                    title: 'Logged in successfully.'
                });
                return router.push('/');
            } else {
                toast({
                    title: response?.error!
                });
            }
        } catch (error: any) {
            setLoading(false)
            console.log(error);
            toast({
                title: serachParams.get('error') || 'somethiong went wrong.',
            });
        }
    }

    return (
        <section>
            <div className="w-full h-screen flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Sign in
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 ">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/register"
                            className="font-semibold text-black transition-all duration-200 hover:underline"
                        >
                            Create a free account
                        </Link>
                    </p>
                    <form onSubmit={(e) => handleLoginClick(e)} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Email address{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled={loading && true}
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='Email'
                                        autoComplete="email"
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between flex-wrap">
                                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Password{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        disabled={loading && true}
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder='Password'
                                        autoComplete="current-password"
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <Button
                                    disabled={loading && true}
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 transition-transform active:scale-[98%]"
                                >
                                    {
                                        loading ? <><Loader2 className=' h-4 w-4 animate-spin mr-2' /> Signing in..</> : 'Sign in'
                                    }
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginForm