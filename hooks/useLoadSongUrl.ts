import { Song } from "@/types"
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"


const useLoadSong = (song: Song) => {
    const { supabaseClient } = useSessionContext()

    if(!song) {
        return ""
    }

    const { data: songData } = supabaseClient
        .storage
        .from("songs")
        .getPublicUrl(song.song_path)


    return songData.publicUrl
}

export default useLoadSong