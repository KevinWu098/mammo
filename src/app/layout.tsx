import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import PageSidebarSlot from "@/components/PageSidebarSlot";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";
import { FileSearch2, Home, Scan, Zap } from "lucide-react";

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
                        <div className="w-52 bg-white flex-col py-64 justify-center">
                            <PageSidebarSlot
                                title="home"
                                icon={<Home fill="white" strokeWidth={0} />}
                                selected={true}
                            ></PageSidebarSlot>
                            <PageSidebarSlot
                                title="scan"
                                icon={
                                    <FileSearch2 fill="white" strokeWidth={0} />
                                }
                                selected={false}
                            ></PageSidebarSlot>
                            <PageSidebarSlot
                                title="act"
                                icon={<Zap fill="white" strokeWidth={0} />}
                                selected={false}
                            ></PageSidebarSlot>
                        </div>
                        <div className="flex-1 p-8">{children}</div>
                    </main>
                </body>
            </Providers>
        </html>
    );
}
