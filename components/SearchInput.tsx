"use client"

import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import qs from "query-string"
import Input from './Input'
import { twMerge } from 'tailwind-merge'
import { FaSearch } from 'react-icons/fa'

type Props = {
    className?: string
}

const SearchInput = ({ className }: Props) => {

    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const debouncedValue = useDebounce<string>(value, 500)

    useEffect(() => {
      const query = {
        title: debouncedValue
      }

      if(!debouncedValue) {
        return
      }
      
      const url = qs.stringifyUrl({
        url: "/search",
        query: query,
      })

      router.push(url)

    }, [debouncedValue, router])
    

  return (
        <Input
            placeholder='What do you want to listen to ?'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={twMerge('placeholder:text-lg focus:border-cyan-400 focus:border-2 lg:max-w-[50%]', className)}
        />
  )
}

export default SearchInput