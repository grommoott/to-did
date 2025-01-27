"use client"
import { Button, Container, Paper, Typography } from "@mui/material"
import { FC, useContext } from "react"
import ToDoList from "./ToDoList"
import { config } from "@/config"
import { useRouter } from "next/navigation"
import { globalContext } from "@/globalContext"

const Dashboard: FC = () => {
    const router = useRouter()
    const { isLoggedIn, setLoggedIn, username, setUsername, id, setId } =
        useContext(globalContext)

    if (!isLoggedIn) {
        return (
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    my: 6,
                }}
            >
                <Paper sx={{ p: 2 }}>
                    <Typography sx={{ textAlign: "center" }}>
                        Чтобы просматривать эту страницу вам нужно
                        зарегистрироваться или войти
                    </Typography>
                </Paper>
            </Container>
        )
    }

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 6,
            }}
        >
            <ToDoList />
            <Button
                color="error"
                sx={{ py: 1, px: 6 }}
                variant="contained"
                onClick={async () => {
                    try {
                        const response = await fetch(
                            `${config.backendUrl}/auth/logout`,
                            { method: "post", credentials: "include" },
                        )

                        if (response.status === 201) {
                            router.replace("/")
                        }

                        setLoggedIn?.call(this, false)
                    } catch (e) {}
                }}
            >
                Выйти из аккаунта
            </Button>
        </Container>
    )
}

export default Dashboard
