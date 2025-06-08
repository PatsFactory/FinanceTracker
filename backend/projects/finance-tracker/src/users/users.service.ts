import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { Utils } from "src/shared/utils";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    public async findOne(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    public async create(username: string, email: string, password: string): Promise<User> {
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = await Utils.hashPassword(password);
        return this.usersRepository.save(user);
    }
}
