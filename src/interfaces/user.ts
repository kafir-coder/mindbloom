import { Kid } from "../database/entities/kid"
import { User } from "../database/entities/user"
import { CreateKidDto, CreateUserDto } from "../entities/user"

export interface IUserSvc {
    createUser(dto: CreateUserDto): Promise<User>
    createKid(dto: CreateKidDto): Promise<Kid>

    getUser(id: string): Promise<User>
    getUsers(page: number,limit: number,filters?: { email?: string; name?: string; role?: string }): Promise<{
        data: User[],
        totalCount: number,
        totalPages: number,
        currentPage: number
    }>
     updateUser(
        user_id: string,
        user: Partial<User>
    ): Promise<User> 
    getKid(id: string): Promise<Kid>
    getKids(
        page: number,
        limit: number,
        filters?: { name?: string; parentId?: string }
    ): Promise<{
        data: Kid[];
        totalCount: number;
        totalPages: number;
        currentPage: number;
    }>

    updateKid(id: string, kid: Partial<Kid>): Promise<void>

    getParentKids(id: string): Promise<Kid[]>
}

export interface IUserRepository {
    createUser(u: Partial<User>): void
    createKid(k: Partial<Kid>): void

    getUser(id: string): Promise<User>
    listUsers(page: number,limit: number,filters?: { email?: string; name?: string; role?: string }): Promise<{
        data: User[],
        totalCount: number,
        totalPages: number,
        currentPage: number
    }>

    updateUser(id: string, user: Partial<User>): Promise<void>;


    getUserByEmail(email: string): Promise<User | null>
    getKid(id: string): Promise<Kid>
    listKids(
        page: number,
        limit: number,
        filters?: { name?: string; parentId?: string }
    ): Promise<{
        data: Kid[],
        totalCount: number,
        totalPages: number,
        currentPage: number
    }>

    updateKid(id: string, kid: Partial<Kid>): Promise<void>

    getParentKids(id: string): Promise<Kid[]>
}