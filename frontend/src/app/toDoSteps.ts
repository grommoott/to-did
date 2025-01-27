interface ToDo {
    type: "imgLeft" | "imgRight"
    transformOriginClass: "left-top" | "right-top" | "center" | "to-do-3"
    imagePath: string
    title: string
    content: string
}

const toDoSteps: ToDo[] = [
    {
        type: "imgLeft",
        transformOriginClass: "right-top",
        imagePath: "/toDoStep1.png",
        title: "Шаг 1",
        content: "Зарегистрируйтесь или войдите в свой аккаунт To Did"
    },
    {
        type: "imgRight",
        transformOriginClass: "center",
        imagePath: "/toDoStep2.png",
        title: "Шаг 2",
        content: "Нажмите кнопку \"Зарегистрироваться\", чтобы создать аккаунт"
    },
    {
        type: "imgLeft",
        transformOriginClass: "to-do-3",
        imagePath: "/toDoStep3.png",
        title: "Шаг 3",
        content: "Напишите свой туду и нажмите кнопку \"Создать Туду\""
    },
    {
        type: "imgRight",
        transformOriginClass: "center",
        imagePath: "/toDoStep4.png",
        title: "Готово!",
        content: "Теперь вы самый продуктивный, умный и просто хороший человек"
    }
]

export default toDoSteps
