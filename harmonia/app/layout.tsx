
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./global.css";

import { Figtree } from "next/font/google"

import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider"; 
import getSongsByUserId from "@/actions/getSongsByUserId";




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
}: Readonly<{

  children: React.ReactNode
}>) {
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
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
// ESTO IBA EN EL BODY 
// </body> </html>{`${geistSans.variable} ${geistMono.variable} antialiased`}> 