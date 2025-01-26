"use client"
import { config } from "@/config"
import { globalContext } from "@/globalContext"
import { Login } from "@mui/icons-material"
import { AppBar, Box, Button, Icon, Toolbar, Typography } from "@mui/material"
import Image from "next/image"
import { FC, useContext, useEffect } from "react"

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
    const { isLoggedIn, username, setId, setUsername } =
        useContext(globalContext)

    useEffect(() => {
        ;(async () => {
            try {
                await fetch(`${config.backendUrl}/auth/refresh`, {
                    method: "post",
                })
                const { id, username } = await (
                    await fetch(`${config.backendUrl}/users`)
                ).json()

                setId?.call(this, id)
                setUsername?.call(this, username)
            } catch (e) {}
        })()
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
                    <Button sx={{ p: 1, gap: 1 }}>
                        <Image
                            src={"/logo-green.svg"}
                            alt="logo"
                            height={32}
                            width={32}
                        />
                        <Typography>To Did</Typography>
                    </Button>

                    <Box sx={{ flexGrow: 1 }} />

                    {isLoggedIn ? (
                        <Button>
                            <Typography>{username}</Typography>
                        </Button>
                    ) : (
                        <Button sx={{ p: 1, gap: 1 }}>
                            <Typography>Log in</Typography>
                            <Login />
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Header
