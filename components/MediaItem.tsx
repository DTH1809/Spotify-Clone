"use client"

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

type Props = {
    onClick?: (id: string) => void
    data: Song
    children?: React.ReactNode
}

const MediaItem = ({ onClick, data, children }: Props) => {

    const imagePath = useLoadImage(data)

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id)
        }

        //TODO: Default turn on player
    }

  return (
    <div onClick={handleClick} className='flex items-center gap-x-3 cursor-pointer hover:bg-neutral-500/50 hover:text-white w-full p-2 rounded-md group'>
        <div className='relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden '>
            <Image fill src={imagePath!} alt='media image' className='object-cover' />
        </div>
        <div className='flex flex-col gap-y-1 overflow-hidden flex-1'>
            <p className='text-white truncate text-sm hover:underline group-hover:font-semibold'>{data.title}</p>
            <p className='text-neutral-400 text-xs truncate group-hover:text-white hover:underline group-hover:font-semibold'>{data.author}</p>
        </div>
        {children}
    </div>
  )
}

export default MediaItem