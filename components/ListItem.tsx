"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaPlay } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'

type Props = {
    image?: string
    name: string
    href: string
}

const ListItem = ({ image, name, href }: Props) => {

    const router = useRouter()

    const onClick = () => {
        // Add authentication before push
        router.push(href)
    }

  return (
    <button className='relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 pr-4 transition' onClick={onClick}>
        <FcLike size={30} className='ml-5'/>
        <p className='font-medium truncate py-5'>{name}</p>
        <div className='absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110'>
            <FaPlay className='text-black '/>
        </div>
    </button>
  )
}

export default ListItem