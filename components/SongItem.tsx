"use client"

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import React from 'react'
import PlayButton from './PlayButton'

type Props = {
    data: Song
    onClick: (id: string) => void
}

const SongItem = ({ data, onClick }: Props) => {

    const imagePath = useLoadImage(data)

  return (
    <div 
        onClick={() => onClick(data.id)}
        className='relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'
    >
        <div className='relative aspect-square w-full h-full rounded-md overflow-hidden'>
            <Image className='object-cover' src={imagePath} fill alt='song image' />
        </div>
        <div className='flex flex-col items-start w-full pt-2'>
            <p className='text-sm truncate font-semibold w-full'>
                {data.title}
            </p>
            <p className='text-xs text-neutral-400 w-full truncate'>
               By {data.author}
            </p>
        </div>
        <div className='absolute bottom-[5%] right-[5%]'>
            <PlayButton />
        </div>
    </div>
  )
}

export default SongItem