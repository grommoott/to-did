import { Email, Telegram } from "@mui/icons-material"
import {
    Box,
    Button,
    Icon,
    Link,
    Paper,
    Stack,
    Typography,
} from "@mui/material"
import Image from "next/image"
import { FC } from "react"

const Footer: FC = () => {
    return (
        <Box sx={{ position: "relative", bottom: 0, right: 0, left: 0 }}>
            <Paper
                square
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                }}
            >
                <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                    <Image
                        src="/logo-green.svg"
                        alt="logo-green"
                        width={48}
                        height={48}
                    />
                    <Typography sx={{ fontSize: 24 }} color="primary">
                        TO DID
                    </Typography>
                </Stack>
                <Stack direction="column" sx={{ alignItems: "center", gap: 1 }}>
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: 1 }}
                    >
                        <Icon>
                            <Telegram color="primary" />
                        </Icon>
                        <Link>@grommoott</Link>
                    </Stack>
                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: 1 }}
                    >
                        <Icon>
                            <Email color="primary" />
                        </Icon>
                        <Link>gregorshuv@yandex.ru</Link>
                    </Stack>
                </Stack>
            </Paper>
        </Box>
    )
}

export default Footer
