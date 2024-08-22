"use client"

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

type Props = {
    songId: string
}

const LikeButton = ({ songId }: Props) => {

    const [isLiked, setIsLiked] = useState(false)
    const router = useRouter()
    const { supabaseClient } = useSessionContext()

    const authModal = useAuthModal()
    const { user } = useUser()

    const handleLike = async () => {
        if(!user) {
            toast.error("You have to login to like songs")
            return authModal.onOpen()
        }

        if(isLiked) {
            const { error } = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user?.id)
                .eq("song_id", songId)

            if(error) {
                toast.error(error.message)
            } else {
                setIsLiked(false)
                toast.success("Unliked!")
            }
        } else {
            const { error } = await supabaseClient
                .from("liked_songs")
                .insert({
                    song_id: songId,
                    user_id: user.id,
                })

            if(error) {
                toast.error(error.message)
            } else {
                setIsLiked(true)
                toast.success("Liked!")
            }
        }
        router.refresh()
    }

    useEffect(() => {
      if(!user?.id) {
        return
      }

      const fetchData = async () => {
        const { data, error } = await supabaseClient
            .from("liked_songs")
            .select("*")
            .eq("user_id", user.id)
            .eq("song_id", songId)
            .single()

        if(!error && data) {
            setIsLiked(true)
        } else {
            setIsLiked(false)
        }
      }

      fetchData()

    }, [songId, supabaseClient, user?.id])

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart
    
  return (
    <button className='cursor-pointer hover:opacity-75 transition hover:scale-110' onClick={handleLike}>
        <Icon color={isLiked ? "#22c55e" : "white"} size={30} />
    </button>
  )
}

export default LikeButton