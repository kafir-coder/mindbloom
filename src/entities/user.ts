export type CreateKidDto = {
    name: string
    dateofBirth: Date
    parent_id: string
}

export type CreateUserDto = {
    name: string
    email: string
    password: string
    role: "Parent" | "Psychologist"
}
