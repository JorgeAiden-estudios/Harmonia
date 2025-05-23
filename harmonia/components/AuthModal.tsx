"use client";

import { 
    useSessionContext,
    useSupabaseClient 
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";




const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose]);


    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }

    }

    return (
        <Modal 
            title="Bienvenido" 
            description="Accede a tu cuenta"
            isOpen={isOpen}
            onChange={onChange}
        >

            <Auth 
                theme="dark"
                magicLink
                providers={["github", "google"]} //en esta linea tambien podemos poner otras como facebook
                supabaseClient={supabaseClient}
                appearance={{ 
                    theme: ThemeSupa, 
                    variables: {
                        default: {
                        colors: {
                            brand: "#404040",
                            brandAccent: "#22c55e"
                        }
                    }
                }
                }}
            />
        </Modal>
    );
}

export default AuthModal;