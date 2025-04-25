
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider"; 
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";




const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




/* const font = Figtree ({ subsets: ["latin"] }) */

export const metadata: Metadata ={
  title: "Harmonia",
  description: "Listen to music",
};

export const revalidate = 0;


export default async function RootLayout({
  children,
}: {

  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId(); 

  return (
    <html lang="en">
      <body className= {`${geistSans.variable} ${geistMono.variable} antialiased`}> 
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
