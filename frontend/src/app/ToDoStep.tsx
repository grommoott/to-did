import { Box, Paper, Stack, Typography } from "@mui/material"
import Image from "next/image"
import { FC } from "react"
import "./index.scss"

interface Props {
    type: "imgLeft" | "imgRight"
    transformOriginClass: "left-top" | "right-top" | "center"
    imagePath: string
    title: string
    content: string
}

const ToDoStep: FC<Props> = ({
    type,
    imagePath,
    title,
    content,
    transformOriginClass,
}) => {
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
                    <div className={`${transformOriginClass}`}>
                        <Image
                            unoptimized={true}
                            src={imagePath}
                            width={1500}
                            height={1000}
                            alt="toDoStep"
                            className={`to-do-step-sizing`}
                            draggable={false}
                        />
                    </div>
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
                <Typography color="primary" variant="h4" sx={{ mb: 2 }}>
                    {title}
                </Typography>
                <Typography>{content}</Typography>
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
                    <div className={`${transformOriginClass}`}>
                        <Image
                            unoptimized={true}
                            src={imagePath}
                            width={1500}
                            height={1000}
                            alt="toDoStep"
                            className={`to-do-step-sizing`}
                            draggable={false}
                        />
                    </div>
                </Paper>
            )}
        </Paper>
    )
}

export default ToDoStep
