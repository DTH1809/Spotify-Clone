"use client"

import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
import { Song } from '@/types'
import React from 'react'
import { FaPlay } from 'react-icons/fa'

type Props = {
    songs: Song[]
}

const SearchContent = ({ songs }: Props) => {

    const onPlay = useOnPlay(songs)

    if(songs.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                <p className='text-3xl font-semibold'>No songs found.</p>
            </div>    
        )
    }

  return (
    <div className='flex flex-col gap-y-2 w-full px-6'>
        {songs.map((song) => (
            <div key={song.id} className='flex items-center gap-x-4 w-full'>
                <div className='flex-1 flex'>
                    <MediaItem 
                        onClick={(id: string) => onPlay(id)} 
                        data={song}
                        children={
                            <div className='hidden md:flex'>
                                <FaPlay size={30} className='opacity-0 group-hover:opacity-100 transition hover:scale-110' />
                            </div>
                        }
                    />
                </div>
                <LikeButton songId={song.id} />
            </div>
        ))}
    </div>
  )
}

export default SearchContent