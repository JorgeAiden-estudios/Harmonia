import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModal = useAuthModal();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user){
            return authModal.onOpen();
        }
        //The id which the user CLICKED DIRECTLY
        player.setId(id);
        //A playlist of WHERE the user CLICKED (favourites, main page, my library...)
        player.setIds(songs.map((song) => song.id));
    };

    return onPlay;
};

export default useOnPlay;