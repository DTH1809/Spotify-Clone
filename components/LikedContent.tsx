"use client"

import getLikedSongs from '@/actions/getLikedSongs'
import { useUser } from '@/hooks/useUser'
import { Song } from '@/types'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import useOnPlay from '@/hooks/useOnPlay'
import { FaPlay } from 'react-icons/fa'

type Props = {
    songs: Song[]
}

const LikedContent = ({ songs }: Props) => {

    const router = useRouter()
    const { isLoading, user } = useUser()
    const onPlay = useOnPlay(songs)

    useEffect(() => {
      if(!isLoading && !user) {
        router.replace("/")
      }
    }, [isLoading, user, router])

    if(songs?.length === 0) {
        return (
            <div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
                No liked songs.
            </div>
        )
    }
    

  return (
    <div className='flex flex-col gap-y-2 w-full p-6'>
        {songs.map((song) => (
            <div key={song.id} className='flex items-center gap-x-4 w-full'>
                <div className='flex-1'>
                    <MediaItem data={song} onClick={(id: string) => onPlay(id)} children={
                            <div className='hidden md:flex'>
                                <FaPlay size={30} className='opacity-0 group-hover:opacity-100 transition hover:scale-110' />
                            </div>
                        } />
                </div>
                <LikeButton songId={song.id} />
            </div>
        ))}

    </div>
  )
}

export default LikedContent