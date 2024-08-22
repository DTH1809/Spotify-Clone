"use client"

import Button from '@/components/Button'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useUser } from '@/hooks/useUser'
import { postData } from '@/libs/helpers'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {}

const AccountContent = (props: Props) => {

    const router = useRouter()
    const subscribeModal = useSubscribeModal()
    const { user, isLoading, subscription } = useUser()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
      if(!user && !isLoading) {
        router.replace("/")
      }
    }, [user, isLoading, router])
    
    const redirectToCustomerPortal = async () => {
        setLoading(true)
        try {
            const { url, error } = await postData({
                url: "/api/create-portal-link/"
            })
            window.location.assign(url)
        } catch (error) {
            toast.error((error as Error).message)
        }
        setLoading(false)
    }

  return (
    <div className='mb-7 px-6'>
        {!subscription && (
            <div className='flex flex-col gap-y-4'>
                <h6>No active plan</h6>
                <Button onClick={subscribeModal.onOpen} className='w-[300px]'>
                    Subscribe
                </Button>
            </div>
        )}
        {subscription && (
            <div className='flex flex-col gap-y-4'>
                <h6>
                    You are current on the <b>{subscription.prices?.products?.name}</b> plan.
                </h6>
                <Button disabled={loading || isLoading} onClick={redirectToCustomerPortal} className='w-[300px]'>
                    Open customer portal
                </Button>
            </div>
        )}
    </div>
  )
}

export default AccountContent