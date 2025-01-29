"use client"
import { config } from "@/config"
import { globalContext } from "@/globalContext"
import { AccountCircle, Login } from "@mui/icons-material"
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { FC, useContext, useEffect } from "react"

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    const { isLoggedIn, username, setId, setUsername, setLoggedIn } =
        useContext(globalContext)

    useEffect(() => {
        const refresh = async () => {
            try {
                const response = await fetch(
                    `${config.backendUrl}/auth/refresh`,
                    {
                        method: "post",
                        credentials: "include",
                    },
                )

                if (response.status === 401) {
                    return
                }

                const data = await fetch(`${config.backendUrl}/users`, {
                    credentials: "include",
                })

                if (data.status !== 200) {
                    return
                }

                const { id, username } = await data.json()

                setId?.call(this, id)
                setUsername?.call(this, username)
                setLoggedIn?.call(this, true)
            } catch (e) {}
        }

        refresh()
        const interval = setInterval(refresh, 600_000)

        return () => clearInterval(interval)
    }, [])

    return (
        <Box sx={{ height: 64 }}>
            <AppBar
                variant="outlined"
                position="fixed"
                color="transparent"
                sx={{
                    backgroundColor: "#18181aaa",
                    backdropFilter: "blur(8px)",
                }}
            >
                <Toolbar
                    sx={{
                        backgroundColor: "transparent",
                    }}
                >
                    <Link href="/">
                        <Button sx={{ p: 1, gap: 1 }}>
                            <Image
                                src={"/logo-green.svg"}
                                alt="logo"
                                height={32}
                                width={32}
                            />
                            <Typography>To Did</Typography>
                        </Button>
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />

                    {isLoggedIn ? (
                        <Link href="/dashboard">
                            <Button sx={{ p: 1, gap: 1 }}>
                                <AccountCircle />
                                <Typography>{username}</Typography>
                            </Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button sx={{ p: 1, gap: 1 }}>
                                <Typography>Войти</Typography>
                                <Login />
                            </Button>
                        </Link>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
