"use client"
import {
    createContext,
    Dispatch,
    FC,
    ReactNode,
    SetStateAction,
    useState,
} from "react"

type GlobalContext = {
    isLoggedIn: boolean
    setLoggedIn?: Dispatch<SetStateAction<boolean>>
    username?: string
    setUsername?: Dispatch<SetStateAction<string | undefined>>
    id?: number
    setId?: Dispatch<SetStateAction<number | undefined>>
}

const globalContext = createContext<GlobalContext>({
    isLoggedIn: false,
})

const GlobalContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>()
    const [id, setId] = useState<number>()
    const [isLoggedIn, setLoggedIn] = useState(false)

    return (
        <globalContext.Provider
            value={{
                isLoggedIn,
                setLoggedIn,
                username,
                setUsername,
                id,
                setId,
            }}
        >
            {children}
        </globalContext.Provider>
    )
}

export { globalContext, GlobalContextProvider }
