import { Kid } from "../../database/entities/kid";
import { User } from "../../database/entities/user";
import { CreateUserDto, CreateKidDto } from "../../entities/user";
import { IUserSvc, IUserRepository } from "../../interfaces/user";
import bcrypt, { genSalt } from 'bcryptjs'
import crypto from 'crypto';
import { CustomError } from "../../errors/errors";

export class UserSvc implements IUserSvc {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}
    async createUser(dto: CreateUserDto): Promise<User> {

        if (dto.password.trim() == "") {
            throw new CustomError("password is empty", 400)
        }
        const user = await this.userRepository.getUserByEmail(dto.email)

        if (user) {
            throw new CustomError("user already exists", 400)
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
            asdDiagnosisPercertage: 0,
            adhdDiagnosisPercentage: 0
        })

        return this.getKid(id)
    }
    async getUser(id: string): Promise<User> {    
        const user =  this.userRepository.getUser(id)
        if (!user) {
            throw new CustomError("user does not exists", 404)
        }
        return user
    }

    async getUsers(
        page: number = 1,
        limit: number = 10,
        filters?: { email?: string; name?: string; role?: string }
    ) {
        return this.userRepository.listUsers(page, limit, filters);
    }

    async getKid(id: string): Promise<Kid> {
        const kid = await  this.userRepository.getKid(id)
        if (!kid) {
            throw new CustomError("kid does not exists", 404)
        }
        return kid
    }

    async getKids(
        page: number = 1,
        limit: number = 10,
        filters?: { name?: string; parentId?: string }
    ) {
        return this.userRepository.listKids(page, limit, filters);
    }

    async updateKid(
        kid_id: string,
        kid: Partial<User>
    ) {
        return this.userRepository.updateKid(kid_id, kid)
    }
    getParentKids(id: string): Promise<Kid[]> {
        return this.userRepository.getParentKids(id)
    }
}