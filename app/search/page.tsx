import getSongsByTitle from '@/actions/getSongsByTitle'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import React from 'react'
import SearchContent from './components/SearchContent'

type Props = {
    searchParams: {
        title: string
    }
}

export const revalidate = 0

const Search = async ({ searchParams }: Props) => {

    const songs = await getSongsByTitle(searchParams.title)

  return (
    <div className='bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto'>
        <Header className='from-cyan-500 bg-gradient-to-b'>
            <div className='mb-2 flex flex-col gap-y-6'>
                <h1 className='text-white text-3xl font-semibold'>Search</h1>
                <SearchInput className='rounded-full hover:border-gray-500' />
            </div>
        </Header>
        <SearchContent songs={songs} />
    </div>
  )
}

export default Search