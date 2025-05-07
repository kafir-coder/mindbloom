import { Kid } from "../../database/entities/kid";
import { User } from "../../database/entities/user";
import { CreateUserDto, CreateKidDto } from "../../entities/user";
import { IUserSvc, IUserRepository } from "../../interfaces/user";
import bcrypt, { genSalt } from 'bcryptjs'
import crypto from 'crypto';

export class UserSvc implements IUserSvc {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}
    async createUser(dto: CreateUserDto): Promise<User> {

        const user = await this.userRepository.getUserByEmail(dto.email)

        if (user) {
            throw new Error("user already exists")
        }

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(dto.password, salt)

        const id =  crypto.randomUUID();
        await this.userRepository.createUser({
            id,
            name: dto.name,
            email: dto.email, 
            role: dto.role,
            passwordHash,
        })

        return this.getUser(id)
    }
    async createKid(dto: CreateKidDto): Promise<Kid> {
        const id = crypto.randomUUID();
        const parent = await this.getUser(dto.parent_id)
        await this.userRepository.createKid({
            id,
            name: dto.name,
            dateOfBirth: dto.dateofBirth,
            parent,
        })

        return this.getKid(id)
    }
    getUser(id: string): Promise<User> {    
        return this.userRepository.getUser(id)
    }

    async getUsers(
        page: number = 1,
        limit: number = 10,
        filters?: { email?: string; name?: string; role?: string }
    ) {
        return this.userRepository.listUsers(page, limit, filters);
    }

    getKid(id: string): Promise<Kid> {
        return this.userRepository.getKid(id)
    }

    async getKids(
        page: number = 1,
        limit: number = 10,
        filters?: { name?: string; parentId?: string }
    ) {
        return this.userRepository.listKids(page, limit, filters);
    }
    getParentKids(id: string): Promise<Kid[]> {
        return this.userRepository.getParentKids(id)
    }
}