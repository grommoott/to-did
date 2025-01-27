"use client"
import { Button, Paper, TextField } from "@mui/material"
import { FC, useState } from "react"

interface Props {
    onCreate: (content: string) => void
}

const ToDoForm: FC<Props> = ({ onCreate }) => {
    const [content, setContent] = useState("")

    return (
        <Paper
            sx={{
                width: { xs: "80vw", sm: "40vw" },
                p: 2,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
            }}
            component="form"
            onSubmit={(e) => {
                e.preventDefault()
                setContent("")
                onCreate(content)
            }}
        >
            <TextField
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Текст туду"
                sx={{ flexGrow: 1 }}
            />

            <Button type="submit" variant="contained" sx={{ px: 6, py: 1 }}>
                Создать Туду
            </Button>
        </Paper>
    )
}

export default ToDoForm
