import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

type Props = {
    label: string
    icon: IconType
    href: string
    active?: boolean
}

const SidebarItem = ({ label, icon: Icon, href, active }: Props) => {
  return (
    <Link href={href} className={twMerge(`flex h-auto items-center w-full gap-x-4 text-lg font-medium cursor-pointer hover:text-white text-neutral-400 py-1 `, active && "text-white")}>
       <Icon size={30} />
       <p>{label}</p>
    </Link>
  )
}

export default SidebarItem