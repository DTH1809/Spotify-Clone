import { Song } from "@/types"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"

const useGetSongById = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false)
    const [song, setSong] = useState<Song | undefined>(undefined)
    const { supabaseClient }  = useSessionContext()

    useEffect(() => {
        if(!id) {
            return
        }
      
        setIsLoading(true)

        const fetchSong = async () => {
           const { data, error } = await supabaseClient
            .from("songs")
            .select("*")
            .eq("id", id) 
            .single()

            if(error) {
                setIsLoading(false)
                console.log("get song by id error")
                return
            }

            setSong(data as Song || undefined)
            setIsLoading(false)
        }

        fetchSong()
    }, [id, supabaseClient])

    return useMemo(() => ({
        isLoading,
        song,
    }), [isLoading, song])
    
} 

export default useGetSongById