import Header from '@/components/Header'
import React from 'react'
import AccountContent from './components/AccountContent'

type Props = {}

const Account = (props: Props) => {
  return (
    <div className='bg-neutral-900 h-full w-full overflow-hidden overflow-y-auto rounded-lg'>
        <Header className='bg-gradient-to-b from-red-400'>
            <div className='mb-2 flex flex-col gap-y-6'>
                <h1 className='text-white font-semibold text-3xl'>Account Details</h1>
            </div>
        </Header>
        <AccountContent />
    </div>
  )
}

export default Account