import { Box, Card, Typography } from "@mui/material"
import { FC } from "react"

interface Props {
    title: string
    description: string
}

const ProsCard: FC<Props> = ({ title, description }) => {
    return (
        <Card
            sx={{
                width: { xs: "80vw", md: 240, lg: 320 },
                height: "full",
                p: 2,
            }}
        >
            <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                {title}
            </Typography>

            <Typography>{description}</Typography>
        </Card>
    )
}

export default ProsCard
