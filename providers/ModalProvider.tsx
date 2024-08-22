"use client"

import AuthModal from '@/components/AuthModal'
import Modal from '@/components/Modal'
import UploadModal from '@/components/UploadModal'
import SubscribeModal from "@/components/SubscribeModal"
import React, { useEffect, useState } from 'react'
import { ProductWithPrice } from '@/types'

type Props = {
  products: ProductWithPrice[]
}

const ModalProvider = ({ products }: Props) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
      setIsMounted(true)
    }, [])
    
    if(!isMounted) {
        return null
    }

  return (
    <>
        <AuthModal />
        <UploadModal />
        <SubscribeModal products={products} />
    </>
  )
}

export default ModalProvider