import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";

export const revalidate = 0; 

export default async function Home() {
  const songs = await getSongs();

  return (
    <div className="bg-gradient-to-b from-[#94F4F1] to-[#00EEE5] 
      rounded-lg 
      h-full 
      w-full 
      overflow-hidden 
      overflow-y-auto">
      
      <Header className="bg-transparent">
        <div className="mb-2 px-6 pt-6">
          <h1 className="text-white text-4xl font-bold tracking-tight drop-shadow-md">
            ¡Bienvenid@!
          </h1>
          <div className="grid 
              grid-cols-1 
              sm:grid-cols-2 
              xl:grid-cols-3 
              2xl:grid-cols-4 
              gap-3 mt-4">
            <ListItem 
              image="/images/favs.png"
              name="Favoritos"
              href="liked"
            />
          </div>
        </div>
      </Header>

      <main className="px-6 pb-6">
        <div className="bg-[#FFF8F3]/80 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-[#FFA258]">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-[#FF7100] text-2xl font-semibold">
              Nuevas canciones
            </h1>
          </div>
          <PageContent songs={songs} />
        </div>
      </main>
    </div>
  );
}
