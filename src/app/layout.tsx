import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import Link from "next/link";
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
                        <div className=" flex w-1/6 bg-white flex-col py-64 px-4 gap-4">
                            <Link href="/dashboard">
                                <PageSidebarSlot
                                    title="home"
                                    value="dashboard"
                                    icon={<Home fill="white" strokeWidth={0} />}
                                    selected={true}
                                />
                            </Link>
                            <Link href="/scan/upload">
                                <PageSidebarSlot
                                    title="scan"
                                    value="scan"
                                    icon={
                                        <FileSearch2
                                            fill="white"
                                            strokeWidth={0}
                                        />
                                    }
                                    selected={false}
                                />
                            </Link>
                            <Link href="/chat">
                                <PageSidebarSlot
                                    title="act"
                                    value="act"
                                    icon={<Zap fill="white" strokeWidth={0} />}
                                    selected={false}
                                />
                            </Link>
                        </div>
                        <div className="flex-1 py-8 pr-8">{children}</div>
                    </main>
                </body>
            </Providers>
        </html>
    );
}
