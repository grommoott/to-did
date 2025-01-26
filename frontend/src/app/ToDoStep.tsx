import { Box, Paper, Stack, Typography } from "@mui/material"
import Image from "next/image"
import { FC } from "react"
import "./index.scss"

interface Props {
    type: "imgLeft" | "imgRight"
    imagePath: string
    title: string
    content: string
}

const ToDoStep: FC<Props> = ({ type, imagePath, title, content }) => {
    return (
        <Paper
            sx={{
                maxWidth: "80vw",
                display: "flex",
                flexDirection: {
                    xs: type == "imgLeft" ? "column" : "column-reverse",
                    md: "row",
                },
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            {type == "imgLeft" && (
                <Paper
                    sx={{
                        m: 2,
                        height: 320,
                        width: 320,
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Image
                        unoptimized={true}
                        src={imagePath}
                        width={1500}
                        height={1000}
                        alt="toDoStep"
                        className="right to-do-step-sizing"
                        style={{
                            transformOrigin: "top right",
                            transform: "scale(0.35)",
                        }}
                        draggable={false}
                    />
                </Paper>
            )}
            <Stack
                direction="column"
                sx={{
                    p: 4,
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: 480,
                }}
            >
                <Typography color="primary" variant="h3">
                    {title}
                </Typography>
                <Typography variant="h5">{content}</Typography>
            </Stack>
            {type == "imgRight" && (
                <Paper
                    sx={{
                        m: 2,
                        height: 320,
                        width: 320,
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Image
                        unoptimized={true}
                        src={imagePath}
                        width={1500}
                        height={1000}
                        alt="toDoStep"
                        className="left to-do-step-sizing"
                        style={{
                            transformOrigin: "top left",
                            transform: "scale(0.35)",
                        }}
                        draggable={false}
                    />
                </Paper>
            )}
        </Paper>
    )
}

export default ToDoStep
