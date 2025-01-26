import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import type { Metadata } from "next"
import theme from "@/theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript"
import Header from "@/components/Header"
import { GlobalContextProvider } from "@/globalContext"
import Footer from "@/components/Footer"
import "./global.scss"

export const metadata: Metadata = {
    title: "To Did!",
    description: "Мы всё уже сделали за тебя)",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <InitColorSchemeScript attribute="class" defaultMode="dark" />
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <GlobalContextProvider>
                            <Header />
                            {children}
                        </GlobalContextProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    )
}
