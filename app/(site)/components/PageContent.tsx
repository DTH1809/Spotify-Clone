"use client"

import SongItem from '@/components/SongItem'
import useOnPlay from '@/hooks/useOnPlay'
import { Song } from '@/types'
import React from 'react'

type Props = {
    songs: Song[]
}

const PageContent = ({ songs }: Props) => {

    const onPlay = useOnPlay(songs)

    if(songs.length === 0) {
        return (
            <div className='mt-4 text-neutral-400'>No songs available</div>
        )
    }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-4'>
        {songs.map((item, i) => (
            <SongItem 
                key={i}
                onClick={(id: string) =>onPlay(id)}
                data={item}
            />
        ))}

    </div>
  )
}

export default PageContent