"use client"
import { Box } from "@mui/joy"
import {
    Button,
    Container,
    Paper,
    Typography,
    useColorScheme,
} from "@mui/material"
import { useEffect } from "react"

export default function Home() {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Paper sx={{ p: 2 }}>
                    <Typography>I'm the typography</Typography>
                </Paper>
                <h1>Hello world!</h1>
                <Button variant="contained">Click me!</Button>
            </Box>
        </Container>
    )
}
