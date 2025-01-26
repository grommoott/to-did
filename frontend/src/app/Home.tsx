import {
    Container,
    Typography,
    Box,
    Grow,
    Card,
    Stack,
    Button,
} from "@mui/material"
import Image from "next/image"
import ProsCard from "./ProsCard"
import { prosArray } from "./pros"
import toDoSteps from "./toDoSteps"
import ToDoStep from "./ToDoStep"

export default function Home() {
    return (
        <Container maxWidth="lg">
            <Grow in={true} timeout={1000} unmountOnExit>
                <Box
                    sx={{
                        mt: 8,
                        mb: 12,
                        display: "flex",
                        flexDirection: { xs: "column-reverse", lg: "row" },
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: 300,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="h1"
                            sx={{ fontSize: 80 }}
                            color="primary"
                        >
                            To Did
                        </Typography>
                        <Typography variant="h4" sx={{ textAlign: "center" }}>
                            Мы всё уже сделали за тебя
                        </Typography>
                    </Box>
                    <Image
                        src={"/logo-green.svg"}
                        alt="logo green"
                        width={300}
                        height={300}
                        draggable={false}
                    />
                </Box>
            </Grow>

            <Box
                sx={{
                    mb: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                gap={4}
            >
                <Typography variant="h3" sx={{ textAlign: "center" }}>
                    Почему мы?
                </Typography>
                <Stack direction={{ xs: "column", md: "row" }} gap={2}>
                    {prosArray.map((val, id) => (
                        <ProsCard key={id} {...val} />
                    ))}
                </Stack>
            </Box>

            <Box
                sx={{
                    mb: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center" }}
                ></Typography>

                {toDoSteps.map((val, id) => (
                    <ToDoStep {...val} key={id} />
                ))}
            </Box>
        </Container>
    )
}
