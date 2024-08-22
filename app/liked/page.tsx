import getLikedSongs from '@/actions/getLikedSongs'
import Header from '@/components/Header'
import LikedContent from '@/components/LikedContent'
import Image from 'next/image'
import React from 'react'
import { FcLike } from 'react-icons/fc'

export const revalidate = 0


const Liked = async () => {

    const songs = await getLikedSongs()

  return (
    <div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
        <Header className='bg-gradient-to-b from-yellow-400'>
            <h1 className='font-bold text-4xl mb-10'>Liked Songs</h1>
        </Header>
        <LikedContent songs={songs} />
    </div>
  )
}

export default Liked