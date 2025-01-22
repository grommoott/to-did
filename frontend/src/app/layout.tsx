import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: "500"
})

export const metadata: Metadata = {
    title: "To Did!",
    description: "Мы всё уже сделали за тебя)",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.className}`}>
                {children}
            </body>
        </html>
    );
}
