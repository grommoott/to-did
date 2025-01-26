interface ToDo {
    type: "imgLeft" | "imgRight"
    imagePath: string
    title: string
    content: string
}

const toDoSteps: ToDo[] = [
    {
        type: "imgLeft",
        imagePath: "/toDoStep1.png",
        title: "Шаг 1",
        content: "Зарегистрируйтесь или войдите в свой аккаунт To Did"
    }
]

export default toDoSteps
