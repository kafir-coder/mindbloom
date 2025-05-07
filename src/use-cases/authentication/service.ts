import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUserRepository } from "../../interfaces/user";
import { UserRepository } from "../../repositories/user-repository";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const JWT_EXPIRATION = "1h";

export class AuthService {
    private userRepo: IUserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.userRepo.getUserByEmail(email);

        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            return null;
        }

        return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    }

    verifyToken(token: string): any {
        return jwt.verify(token, JWT_SECRET);
    }
}
