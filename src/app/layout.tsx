import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "kTemp",
    description: "A template repository with a setup I love",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Providers>
                <body className={cn(inter.className)}>
                    <main className="h-screen flex w-full">
                        <div className="w-52 bg-white"> </div>
                        <div className="flex-1 p-8">{children}</div>
                    </main>
                </body>
            </Providers>
        </html>
    );
}
