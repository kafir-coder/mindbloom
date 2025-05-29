import { ILike, Repository } from "typeorm";
import { IUserRepository } from "../interfaces/user";
import { AppDataSource } from "../database/data-source";
import { User } from "../database/entities/user";
import { Kid } from "../database/entities/kid";

export class UserRepository implements IUserRepository {
    userRepository: Repository<User>
    kidRepository: Repository<Kid>

    constructor() {
        this.userRepository = AppDataSource.getRepository(User)
        this.kidRepository = AppDataSource.getRepository(Kid)
    }
    
    async updateUser(id: string, user: Partial<User>): Promise<void> {
        await this.userRepository.update(id, user);
    }
    
    getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOneBy({
            email
        })
    }
    async createUser(u: User){
        await this.userRepository.save(u)
    }
    async createKid(k: Kid) {
        await this.kidRepository.save(k)
    }
    getUser(id: string): Promise<User> {
        return this.userRepository.findOneOrFail({
            where: { id },
            relations: ["kids"]
        })
    }
    getKid(id: string): Promise<Kid> {
        return this.kidRepository.findOneOrFail({
            where: { id },
            relations: ["parent"]
        })
    }


    async listUsers(
        page: number = 1,
        limit: number = 10,
        filters?: { email?: string; name?: string; role?: string }
    ) {
        const offset = (page - 1) * limit;

        const where: any = {};
        if (filters?.email) where.email = ILike(`%${filters.email}%`);
        if (filters?.name) where.name = ILike(`%${filters.name}%`);
        if (filters?.role) where.role = filters.role;

        const [users, totalCount] = await this.userRepository.findAndCount({
            where,
            take: limit,
            skip: offset
        });

        return {
            data: users,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        };
    }

    async listKids(
        page: number = 1,
        limit: number = 10,
        parentId: string,
        filters?: { name?: string, all: boolean}
    ) {
        const offset = (page - 1) * limit;

        const where: any = {};
        if (filters?.name) where.name = ILike(`%${filters.name}%`);
        if (parentId && !filters?.all) where.parent = { id: parentId };

        const [kids, totalCount] = await this.kidRepository.findAndCount({
            where,
            take: limit,
            skip: offset,
            relations: ['parent']
        });

        return {
            data: kids,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: page
        };
    }

    async updateKid(id: string, kid: Partial<Kid>): Promise<void> {
        await this.kidRepository.update(id, kid)
    }

    getParentKids(id: string): Promise<Kid[]> {
        return this.kidRepository.find({
            where: {parent: {id}}
        })
    }


}