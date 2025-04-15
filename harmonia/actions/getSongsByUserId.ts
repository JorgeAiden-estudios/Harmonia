import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

const { 
    data: sessionData,
    error: sessionError
}= await supabase.auth.getSession();

    if (sessionError) {
        console.log(sessionError.message);
        return [];

    }

    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("user_id", sessionData.session?.user.id)
        .order("created_at", { ascending: false });

        if (error) {
            console.log(error.message);
        }

        return (data as any) || [];
    };

    export default getSongsByUserId;

    //ESTE ES EL CODIGO QUE ME DA CORREGIDO CHATGPT PARA QUE FUNCIONE
    /*
import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const {
    data: sessionData,
    error: sessionError
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  const { data, error } = await supabase
    .from<Song>("songs")                           //ESTA LINEA CAMBIA
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
    return [];                                      //ESTA LINEA CAMBIA
  }

  return data || [];                                //ESTA LINEA CAMBIA
};

export default getSongsByUserId;
*/

