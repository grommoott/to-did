import { Delete } from "@mui/icons-material"
import { Button, Checkbox, Paper, Typography } from "@mui/material"
import { FC } from "react"

interface Props {
    id: number
    content: string
    isCompleted: boolean
    onUpdateCompleted: (id: number, isCompleted: boolean) => void
    onDelete: (id: number) => void
}

const ToDo: FC<Props> = ({
    content,
    isCompleted,
    id,
    onUpdateCompleted,
    onDelete,
}) => {
    return (
        <Paper
            sx={{
                width: { xs: "80vw", sm: "40vw" },
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: 2,
                gap: 2,
            }}
        >
            <Typography>{content}</Typography>

            <div style={{ flexGrow: 1 }} />

            <Checkbox
                checked={isCompleted}
                onChange={(e) => onUpdateCompleted(id, e.target.checked)}
            />

            <Button onClick={() => onDelete(id)}>
                <Delete />
            </Button>
        </Paper>
    )
}

export default ToDo
