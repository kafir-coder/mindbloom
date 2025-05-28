export type CreateKidDto = {
    name: string
    dateofBirth: Date
    parent_id: string
    gender: string
}

export type CreateUserDto = {
    name: string
    email: string
    password: string
    role: "Parent" | "Psychologist"
    gender: string
    description: string
    image: string
}
