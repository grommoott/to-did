"use client"

import { config } from "@/config"
import { Stack } from "@mui/material"
import { FC, useEffect, useState } from "react"
import ToDo from "./ToDo"
import ToDoForm from "./ToDoForm"

type ToDo = {
    content: string
    id: number
    isCompleted: boolean
}

const ToDoList: FC = () => {
    const [todos, setTodos] = useState<ToDo[]>([])

    useEffect(() => {
        ;(async () => {
            const response = await fetch(`${config.backendUrl}/todos`, {
                credentials: "include",
            })

            if (response.status !== 200) {
                console.error("Произошла ошибка")
                return
            }

            setTodos(await response.json())
        })()
    }, [])

    return (
        <Stack sx={{ gap: 2, mb: 6 }}>
            {todos.map((todo) => (
                <ToDo
                    key={todo.id}
                    {...todo}
                    onUpdateCompleted={async (id, isCompleted) => {
                        let target: ToDo | undefined

                        setTodos((prev) => {
                            const tmp: ToDo[] = []

                            for (const todo of prev) {
                                if (todo.id != id) {
                                    tmp.push(todo)
                                    continue
                                }

                                todo.isCompleted = isCompleted
                                target = todo
                                tmp.push(todo)
                                continue
                            }

                            return tmp
                        })

                        await fetch(`${config.backendUrl}/todos`, {
                            method: "put",
                            body: JSON.stringify(target),
                            headers: {
                                "Content-Type": "application/json",
                            },
                            credentials: "include",
                        })
                    }}
                    onDelete={async (id) => {
                        setTodos((prev) => prev.filter((todo) => todo.id != id))

                        await fetch(`${config.backendUrl}/todos/${id}`, {
                            method: "delete",
                            credentials: "include",
                        })
                    }}
                />
            ))}

            <ToDoForm
                onCreate={async (content) => {
                    const response = await fetch(`${config.backendUrl}/todos`, {
                        method: "post",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ content, isCompleted: false }),
                    })

                    if (response.status !== 201) {
                        return
                    }

                    const todo = await response.json()

                    setTodos((prev) => prev.concat(todo))
                }}
            />
        </Stack>
    )
}

export default ToDoList
