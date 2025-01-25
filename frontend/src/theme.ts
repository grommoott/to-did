"use client"
import { createTheme } from "@mui/material";
import { green, lightGreen } from "@mui/material/colors";
import { Roboto } from "next/font/google";

const roboto = Roboto({
    weight: "500",
})

const theme = createTheme({
    cssVariables: {
        colorSchemeSelector: "class",
    },
    typography: {
        fontFamily: roboto.style.fontFamily
    },
    shape: {
        borderRadius: 16
    },
    palette: {
        mode: "dark",
        primary: green,
        secondary: lightGreen,
        background: {
            default: "#161619",
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: "#161619",
                },
            }
        }

    }
})

export default theme
