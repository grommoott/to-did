"use client"
import { config } from "@/config"
import { globalContext } from "@/globalContext"
import { Error } from "@mui/icons-material"
import {
    Box,
    Button,
    Paper,
    Link as MuiLink,
    TextField,
    Typography,
} from "@mui/material"
import { red } from "@mui/material/colors"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useContext, useState } from "react"

type FormData = {
    username?: string
    password?: string
}

interface Props {
    username?: string
}

const Login: FC<Props> = ({ username }) => {
    const [data, setData] = useState<FormData>({
        username,
        password: undefined,
    })
    const [error, setError] = useState<string>()

    const { setId, setUsername, setLoggedIn } = useContext(globalContext)

    const router = useRouter()

    return (
        <Box
            component="form"
            sx={{
                my: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
            onSubmit={async (e) => {
                e.preventDefault()

                if (!data.username || !data.password) {
                    return
                }

                try {
                    let response = await fetch(
                        `${config.backendUrl}/auth/login`,
                        {
                            method: "post",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(data),
                            credentials: "include",
                        },
                    )

                    if (response.status === 404) {
                        setError("Такого пользователя не существует")
                        return
                    }

                    if (response.status === 401) {
                        setError("Неправильный пароль")
                        return
                    }

                    if (response.status !== 201) {
                        setError(`Произошла ошибка "${response.statusText}"`)
                        return
                    }

                    response = await fetch(`${config.backendUrl}/users`, {
                        credentials: "include",
                    })

                    console.log(response.status)
                    if (response.status !== 200) {
                        setError("Произошла ошибка")
                        return
                    }

                    const { id, username } = await response.json()

                    setId?.call(this, id)
                    setUsername?.call(this, username)
                    setLoggedIn?.call(this, true)

                    router.replace("/dashboard")
                } catch (e) {}
            }}
        >
            <Paper
                sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    width: { xs: 280, sm: 360 },
                }}
            >
                <Typography variant="h1" sx={{ fontSize: 48, mb: 2 }}>
                    Вход
                </Typography>

                {error && (
                    <Paper
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            p: 2,
                            gap: 2,
                            backgroundColor: red[500] + "44",
                            mb: 2,
                            borderColor: red[500],
                        }}
                        variant="outlined"
                    >
                        <Error color="error" />
                        <Typography color="error">{error}</Typography>
                    </Paper>
                )}

                <TextField
                    id="username-field"
                    label="Имя пользователя"
                    required
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            username: e.target.value,
                        }))
                    }
                />

                <TextField
                    type="password"
                    id="password-field"
                    label="Пароль"
                    required
                    onChange={(e) =>
                        setData((prev) => ({
                            ...prev,
                            password: e.target.value,
                        }))
                    }
                />

                <Button
                    type="submit"
                    variant="contained"
                    sx={{ py: 1, px: 6, mt: 2 }}
                >
                    Войти
                </Button>

                <Typography
                    sx={{
                        textAlign: "center",
                        wordWrap: "wrap",
                        wordBreak: "break-word",
                    }}
                >
                    Ещё нет аккаунта? Тогда{" "}
                    <MuiLink component={Link} href="/register">
                        зарегистрируйтесь
                    </MuiLink>{" "}
                    прямо сейчас
                </Typography>
            </Paper>
        </Box>
    )
}

export default Login
