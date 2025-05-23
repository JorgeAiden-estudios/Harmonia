"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {

    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    // Songs are in a bucket so we read the path on the db
    // "!" to avoid undefined
    const songUrl = useLoadSongUrl(song!);

    //Don't load player if we don't have song
    if(!song || !songUrl || !player.activeId){
        return null;
    }

    return (
        <div
        className="
            fixed
            bottom-0
            bg-black
            w-full
            py-2
            h-[80px]
            px-4
        ">
            <PlayerContent
                key={songUrl}
                song={song}
                songUrl={songUrl}
            />
        </div>
    );
}

export default Player;