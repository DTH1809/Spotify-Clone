"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'
import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useUser } from '@/hooks/useUser'
import { FaUserAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import usePlayer from '@/hooks/usePlayer'

type Props = {
    children: React.ReactNode
    className?: string
}

const Header = ({ children, className }: Props) => {

    const player = usePlayer()
    const router = useRouter()
    const authModal = useAuthModal()
    const supabaseClient = useSupabaseClient()
    const { user, subscription } = useUser()

    const handleLogout = async () => {
        // handle logout
        const { error } =  await supabaseClient.auth.signOut()
        player.reset()
        router.refresh()

        if(error){ 
            toast.error(error.message)
        } else {
            toast.success("Logged out!")
        }
        
    }

  return (
    <div className={twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`, className)}>
        <div className='w-full mb-4 flex justify-between items-center'>
            <div className='hidden md:flex gap-x-2 items-center'>
                <button className='bg-black rounded-full flex items-center justify-center hover:opacity-75 transition' onClick={() => router.back()}>
                    <RxCaretLeft size={30} className='text-neutral-400 hover:text-white' />
                </button>
                <button className='bg-black rounded-full flex items-center justify-center hover:opacity-75 transition' onClick={() => router.forward()}>
                    <RxCaretRight size={30} className='text-neutral-400 hover:text-white' />
                </button>
            </div>
            <div className='flex md:hidden gap-x-2 items-center'>
                <button className='rounded-full p-2 bg-white flex justify-center items-center hover:opacity-75 transition' onClick={() => router.replace("/")}>
                    <HiHome className='text-black' size={24} />
                </button>
                <button className='rounded-full p-2 bg-white flex justify-center items-center hover:opacity-75 transition' onClick={() => router.replace("/search")}>
                    <BiSearch className='text-black' size={24} />
                </button>
            </div>
            <div className='flex items-center gap-x-4'>
                {user ? (
                    <div className='flex gap-x-4 items-center'>
                        <Button onClick={handleLogout} className='bg-white px-6 py-2' >
                            Logout
                        </Button>
                        <Button className='bg-white inline-flex justify-center items-center' onClick={() => router.push("/account")}>
                            <FaUserAlt />
                        </Button>
                    </div>
                ): (
                    <>
                        <div>
                            <Button className='bg-transparent text-neutral-300 ' onClick={authModal.onOpen}> 
                                Sign Up
                            </Button>
                        </div> 
                        <div>
                            <Button className='bg-white px-6 py-2' onClick={authModal.onOpen}> 
                                Log In
                            </Button>
                        </div> 
                    </>
                )}
            </div>
        </div>
        {children}
    </div>
  )
}

export default Header