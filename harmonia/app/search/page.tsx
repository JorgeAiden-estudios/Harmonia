
import getSongsByTitle from "@/actions/getSongsByTitle"
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import SearchContent from "./components/SearchContent";

interface SearchProps {
    searchParams: Promise<{ title: string }>
}


// CHANGED: 
//export const revalidate = 0;
//const Search = async ({ searchParams }: SearchProps) => {
// FOR:
export default async function Search(props: SearchProps) {
    const searchParams = await props.searchParams;
    const songs = await getSongsByTitle(searchParams.title)

    return (
        <div
            className="bg-gradient-to-b from-[#94F4F1] to-[#00EEE5] 
            rounded-lg 
            h-full 
            w-full 
            overflow-hidden 
            overflow-y-auto"
        >
            <Header className="bg-transparent">
                <div className="mb-2 px-6 pt-6 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold drop-shadow-md">
                        Buscar
                    </h1>
                    <SearchInput />
                </div>
            </Header>

            <main className="px-6 pb-6">
                <div className="bg-[#FFF8F3]/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#FFA258]">
                    <SearchContent songs={songs} />
                </div>
            </main>
        </div>
    )
}