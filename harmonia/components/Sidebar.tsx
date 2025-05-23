"use client";// Indica que este componente se renderiza en el cliente

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import { Song } from "@/types";

import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";





// Se define una interfaz SidebarProps para especificar las propiedades que acepta el componente.
interface SidebarProps {
    children: React.ReactNode;
    songs: Song [] // La propiedad "children" representa cualquier contenido que se pase dentro del componente.
};

//Se crea el componente Sidebar como una función de React (React.FC). Dentro del div se renderiza el contenido
const Sidebar: React.FC<SidebarProps>  = ({ 
    children, 
    songs 
}) => {

        const pathname = usePathname();
        const player = usePlayer();
        
        const routes = useMemo(() => [
            {
                icon: HiHome,
                label: 'Home',
                active: pathname !== '/search',
                href: '/'
            },
            {
               icon: BiSearch,
               label: 'Search',
               active: pathname === '/search',
               href: '/search', 
            }
        ], [pathname]);

    return (
        <div className={twMerge(`
            flex
            h-full
        `,
         player.activeId && "h-[calc(100%-80px)]"
        )}>
            <div className="hidden 
            md:flex 
            flex-col 
            gap-y-2 
            bg-gradient-to-b from-[#F2FEFE] to-[#94F4F1]
            h-full 
            w-[300px] 
            p-2
            rounded-r-2xl
            shadow-md">
            <Box>
                <div className="flex 
                flex-col 
                gap-y-4 
                px-5 
                py-4">
                {routes.map((item) => (
                    <SidebarItem 
                    key={item.label}
                    {...item} />
                    ))}
                </div>
            </Box>
            <Box className="overflow-y-auto h-full">
                <Library songs={songs} />
            </Box>
        </div>
        <main className="h-full flex-1 overflow-y-auto py-2">
            {children}
        </main>
     </div>
    );
}

export default Sidebar;