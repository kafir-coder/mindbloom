import { Kid } from "../../database/entities/kid";
import { User } from "../../database/entities/user";
import { CreateUserDto, CreateKidDto } from "../../entities/user";
import { IUserSvc, IUserRepository } from "../../interfaces/user";
import bcrypt, { genSalt } from 'bcryptjs'
import crypto from 'crypto';
import { CustomError } from "../../errors/errors";
import { pysCode } from "../../utils/constants/psy-codes";
import { createUserSchema } from "../../entities/validation";

export class UserSvc implements IUserSvc {
    constructor(
        private readonly userRepository: IUserRepository,
    ) {}
    async createUser(dto: CreateUserDto): Promise<User> {

        try {
            createUserSchema.parse(dto)    
        } catch (error: any) {
            throw new CustomError(error.toString(), 400)
        }
        

        if (dto.password.trim() == "") {
            throw new CustomError("password is empty", 400)
        }
        const user = await this.userRepository.getUserByEmail(dto.email)

        if (user) {
            throw new CustomError("user already exists", 400)
        }

        if (dto.role == 'Psychologist' && !pysCode.includes(dto.pyscode as string)) {
            throw new CustomError("psycode does not exists", 400)
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
            gender: dto.gender,
            description: dto.description,
            image: dto.image,
            occupation: dto.occupation,
            socials: dto.socials,
            psyCode: dto.pyscode
        })

        return this.getUser(id)
    }

    async updateUser(
        user_id: string,
        user: Partial<User>
    ): Promise<User> {
        const existing = await this.userRepository.getUser(user_id);
        if (!existing) {
            throw new CustomError("user does not exist", 404);
        }
    
        if (user.email && user.email !== existing.email) {
            const userWithSameEmail = await this.userRepository.getUserByEmail(user.email);
            if (userWithSameEmail && userWithSameEmail.id !== user_id) {
                throw new CustomError("email already in use", 400);
            }
        }
    
        if (user.passwordHash) {
            throw new CustomError("cannot directly update password hash", 400);
        }
    
        await this.userRepository.updateUser(user_id, user);
        return this.getUser(user_id);
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
            adhdDiagnosisPercentage: 0,
            gender: dto.gender,
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
        parentId: string,
        filters?: { name?: string, all: boolean }
    ) {
        return this.userRepository.listKids(page, limit, parentId, filters);
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

    async addUserRating(user_id: string, newRating: number): Promise<void> {
        if (newRating < 0 || newRating > 5) {
            throw new CustomError("rating must be between 0 and 5", 400);
        }
    
        const user = await this.userRepository.getUser(user_id);
        if (!user) {
            throw new CustomError("user does not exist", 404);
        }
    
        const totalRating = (user.rating || 0) * (user.ratingCount || 0);
        const updatedRatingCount = (user.ratingCount || 0) + 1;
        const updatedAverage = (totalRating + newRating) / updatedRatingCount;
    
        await this.userRepository.updateUser(user_id, {
            rating: updatedAverage,
            ratingCount: updatedRatingCount
        });

    }
    
}