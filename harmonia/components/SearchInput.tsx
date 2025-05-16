"use client"

import qs from "query-string";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import  useDebounce  from "@/hooks/useDebounce";

import Input from "./Input";


const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 500);


    useEffect(() => {
        const query = {
            title: debouncedValue,
        };
        const url = qs.stringifyUrl({
            url: "/search",
            query: query,
        });
        
        router.push(url);
    }, [debouncedValue, router]);


    return (
        <Input 
        placeholder="¿Qué quieres escuchar?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-white/80 
        backdrop-blur-md 
        border border-[#FFA258]
         placeholder-orange-400
          text-black 
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#FFA258]
           rounded-full 
           px-4 
           py-2"
        />
        
    );
}

export default SearchInput;